import {
  RequestHandler,
} from "../deps.ts";


export interface StartOptions {
  port: number;
}

export async function start(handler: RequestHandler, options: StartOptions = {
  port: 8080,
}) {
  if ("FetchEvent" in window) {
    // deno-lint-ignore no-explicit-any
    addEventListener("fetch", (event: any) => {
      event.respondWith(handler(event.request));
    });
  } else {
    const server = Deno.listen(options);
    for await (const conn of server) {
      handleConn(conn, handler);
    }
  }
}

async function handleConn(conn: Deno.Conn, handler: RequestHandler) {
    const httpConn = Deno.serveHttp(conn);
    for await (const { respondWith, request } of httpConn) {
      respondWith(handler(request))
      .catch(console.error); // Properly handle this.
    }
}
