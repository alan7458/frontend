/**
 * Authored by Alex Hultman, 2018-2019.
 * Intellectual property of third-party.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let { platform, arch, versions } = process;
let version = [platform, arch, versions.modules].join("_");
let uWebSockets;

try {
  console.log(`Loading µWS version: ${version}`);
  /**
   * @typedef {uws.js:SSLApp|uws.js:App} TemplatedApp
   * TemplatedApp is either an SSL or non-SSL app. See App for more info, read user manual.
   *
   * @property {function} listen (host: RecognizedString, port: number, cb: (listenSocket: us_listen_socket) => void): TemplatedApp;
   * Listens to hostname & port. Callback hands either false or a listen socket.
   *
   * @property {function} listen (port: number, cb: (listenSocket: any) => void): TemplatedApp;
   * Listens to port. Callback hands either false or a listen socket.
   *
   * @property {function} get (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP GET handler matching specified URL pattern.
   *
   * @property {function} post (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP POST handler matching specified URL pattern.
   *
   * @property {function} options (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP OPTIONS handler matching specified URL pattern.
   *
   * @property {function} del (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP DELETE handler matching specified URL pattern.
   *
   * @property {function} patch (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP PATCH handler matching specified URL pattern.
   *
   * @property {function} put (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP PUT handler matching specified URL pattern.
   *
   * @property {function} head (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP HEAD handler matching specified URL pattern.
   *
   * @property {function} connect (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP CONNECT handler matching specified URL pattern.
   *
   * @property {function} trace (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP TRACE handler matching specified URL pattern.
   *
   * @property {function} any (pattern: RecognizedString, handler: (res: HttpResponse, req: HttpRequest) => void) : TemplatedApp;
   * Registers an HTTP handler matching specified URL pattern on any HTTP method.
   *
   * @property {function} ws (pattern: RecognizedString, behavior: WebSocketBehavior) : TemplatedApp;
   * Registers a handler matching specified URL pattern where WebSocket upgrade requests are caught.
   *
   * @property {function} publish (topic: RecognizedString, message: RecognizedString, isBinary?: boolean, compress?: boolean) : TemplatedApp;
   * Publishes a message under topic, for all WebSockets under this app. See WebSocket.publish.
   */
  uWebSockets = require(`uws.js/uws_${version}.node`);

  if (process.env.EXPERIMENTAL_FASTCALL) {
    process.nextTick = (f, ...args) => {
      Promise.resolve().then(() => {
        f(...args);
      });
    };
  }

  process.on("exit", () => {
    uWebSockets.free();
    uWebSockets = null;
  });
} catch (e) {
  throw new Error(
    `This version: ${version} of µWS is not compatible with your Node.js build:` +
      e.stack,
  );
}

module.exports = uWebSockets;
