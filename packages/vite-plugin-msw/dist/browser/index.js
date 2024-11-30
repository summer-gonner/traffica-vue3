// src/browser/enableMocking.ts
import { setupWorker } from "msw/browser";

// package.json
var name = "@admin-pkg/vite-plugin-msw";

// src/utils/log.ts
var LIBRARY_PREFIX = `[${name}]`;
var log = (...msg) => {
  console.log(`%c${LIBRARY_PREFIX}`, "font-weight:bold;", ...msg);
};

// src/browser/enableMocking.ts
var genMessage = (handlers) => {
  return {
    type: "updateMockHeaders",
    mockHeaders: handlers.map((n) => n.info.header)
  };
};
var postMsg = (registration, handlers) => {
  const serviceWorker = registration.active;
  if (serviceWorker) {
    serviceWorker.postMessage(genMessage(handlers));
    registration.addEventListener("updatefound", () => {
      serviceWorker.postMessage(genMessage(handlers));
      log(`Value of updateViaCache: ${registration.updateViaCache}`);
    });
  }
};
var enableMocking = async (handlers, options) => {
  const scriptURL = `${import.meta.env.BASE_URL || ""}/mockServiceWorker.js`.replace(
    /\/{2,}/g,
    "/"
  );
  const worker = setupWorker(...handlers);
  if (import.meta.env.DEV) {
    globalThis.__msw_worker = worker;
  }
  const serviceWorkerRegistration = await worker.start({
    onUnhandledRequest: "bypass",
    // quiet: true,
    serviceWorker: {
      url: scriptURL,
      options: {
        updateViaCache: "none"
      }
    },
    ...options
  });
  if (serviceWorkerRegistration) {
    postMsg(serviceWorkerRegistration, handlers);
  } else if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((registration) => {
      postMsg(registration, handlers);
    });
  }
  return serviceWorkerRegistration;
};
export {
  enableMocking
};
