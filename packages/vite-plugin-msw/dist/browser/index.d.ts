import { StartOptions } from 'msw/browser';
import { HttpHandler } from 'msw';

declare const enableMocking: (handlers: HttpHandler[], options?: StartOptions) => Promise<ServiceWorkerRegistration | undefined>;

export { enableMocking };
