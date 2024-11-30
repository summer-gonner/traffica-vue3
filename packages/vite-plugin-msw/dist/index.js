// src/node/index.ts
import { randomUUID } from "node:crypto";
import { handleRequest } from "msw";
import { Emitter } from "strict-event-emitter";
import { Headers } from "headers-polyfill";
import { encodeBuffer } from "@mswjs/interceptors";
var emitter = new Emitter();
async function transformReadableStramToUint8Array(stream) {
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(new Uint8Array(value));
  }
  let totalLength = 0;
  for (let i = 0; i < chunks.length; i++) {
    totalLength += chunks[i].length;
  }
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (let i = 0; i < chunks.length; i++) {
    result.set(chunks[i], offset);
    offset += chunks[i].length;
  }
  return result;
}
var sanitizeHeaders = (headers) => Object.entries({ ...headers }).reduce((acc, [key, value]) => {
  if (typeof key === "string" && !key.startsWith(":")) {
    acc[key] = value;
  }
  return acc;
}, {});
var createNodeMiddleware = (serverOrigin = `http://localhost`) => (...handlers) => {
  return async (req, res, next) => {
    if (!req.method || !req.url) {
      next();
    } else {
      let requestBody;
      if (!["GET", "HEAD"].includes(req.method)) {
        requestBody = encodeBuffer(
          // @ts-ignore
          typeof req.body === "string" ? req.body : JSON.stringify(req.body)
        );
      }
      const mockedRequest = new Request(new URL(req.url, serverOrigin), {
        method: req.method,
        headers: new Headers(sanitizeHeaders(req.headers)),
        credentials: "omit",
        body: requestBody
      });
      await handleRequest(
        mockedRequest,
        randomUUID(),
        handlers,
        {
          onUnhandledRequest: () => null
        },
        // @ts-ignore
        emitter,
        {
          resolutionContext: {
            /**
             * @note Resolve relative request handler URLs against
             * the server's origin (no relative URLs in Node.js).
             */
            baseUrl: serverOrigin
          },
          async onMockedResponse(mockedResponse) {
            const { status, statusText, headers, body } = mockedResponse;
            res.statusCode = status;
            headers.forEach((value, name) => {
              res.setHeader(name, value);
            });
            let returnBody;
            if (body) returnBody = await transformReadableStramToUint8Array(body);
            res.end(returnBody ? returnBody : statusText);
          },
          onPassthroughResponse() {
            next();
          }
        }
      );
    }
  };
};

// src/browser/vitePlugin.ts
import { readFile, copyFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
var __dirname = dirname(fileURLToPath(import.meta.url));
var swFileName = "mockServiceWorker.js";
var localMswDistPath = resolve(__dirname, swFileName);
var createBrowserMiddleware = () => {
  return async (req, res, next) => {
    try {
      if (req.method !== "GET" || !req.url?.includes(`/${swFileName}`)) {
        next();
        return;
      }
      const swContent = await readFile(localMswDistPath, "utf8");
      res.setHeader("content-type", "application/javascript");
      res.statusCode = 200;
      res.end(swContent);
    } catch (error) {
      console.error(error);
      res.statusCode = 500;
      res.end(error.toString());
    }
  };
};
var buildMswForBrowser = async ({ outDir }) => {
  const outputPath = resolve(process.cwd(), outDir, swFileName);
  await copyFile(localMswDistPath, outputPath);
};

// src/index.ts
var browserIntegration = ({ build }) => {
  let outDir;
  return {
    name: "vite-plugin-msw:browser-integration",
    configureServer(devServer) {
      const { isProduction } = devServer.config;
      if (!isProduction) {
        devServer.middlewares.use(createBrowserMiddleware());
      }
    },
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      const isProduction = process.env.NODE_ENV === "production";
      if (isProduction && build) {
        await buildMswForBrowser({ outDir });
      }
    }
  };
};
var getNodeIntegration = (handlers) => {
  return {
    name: "vite-plugin-msw:node-integration",
    configureServer(devServer) {
      devServer.middlewares.use(createNodeMiddleware()(...handlers));
    }
  };
};
function vitePluginMsw(options) {
  const { mode = "browser", handlers = [], build = false } = options;
  if (mode === "node") {
    return getNodeIntegration(handlers);
  } else {
    return browserIntegration({ build });
  }
}
var src_default = vitePluginMsw;
export {
  src_default as default
};
//# sourceMappingURL=index.js.map