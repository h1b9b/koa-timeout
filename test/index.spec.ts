import Koa from "koa";
import { Server } from "net";
import request from "supertest";
import { timeout } from ".."; 

describe("Koa timeout middleware", () => {
  let app: Koa;
  let server: Server;
  const time = 2000;

  beforeEach(() => {
    app = new Koa();
  });

  it("request should not timeout", async () => {
    app.use(timeout(time));
    app.use((ctx) => { ctx.body = "Should not timeout"; });
    server = app.listen();
    const response = await request(server).get("/");
    server.close();

    expect(response.status).toBe(200);
    expect(response.text).toBe("Should not timeout");
  });

  it("request should timeout", async () => {
    app.use(timeout(time));
    app.use((ctx, next) => { 
      return new Promise(() => {
        setTimeout(() => { ctx.body = "should timeout"; next(); }, time + 500);
      });
    });
    server = app.listen();
    const response = await request(server).get("/");
    server.close();

    expect(response.status).toBe(408);
    expect(response.text).toBe("Request timeout");
  });

  it("request should timeout with custom status", async () => {
    app.use(timeout(time, { status: 400 }));
    app.use((ctx, next) => { 
      return new Promise(() => {
        setTimeout(() => { ctx.body = "should timeout"; next(); }, time + 500);
      });
    });
    server = app.listen();
    const response = await request(server).get("/");
    server.close();

    expect(response.status).toBe(400);
    expect(response.text).toBe("Request timeout");
  });
});
