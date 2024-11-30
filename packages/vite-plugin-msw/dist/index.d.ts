import { HttpHandler } from 'msw';
import { PluginOption } from 'vite';

interface VitePluginMswOptions {
    mode?: 'browser' | 'node';
    handlers?: HttpHandler[];
    build?: boolean;
}
declare function vitePluginMsw(options: Omit<VitePluginMswOptions, 'handlers'> & {
    mode?: 'browser';
}): PluginOption;

export { type VitePluginMswOptions, vitePluginMsw as default };
