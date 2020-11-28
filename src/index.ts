import { ParameterizedContext, Next } from "koa";

type TimeoutOptions = {
  status: number
}

export function timeout(time: number, { status }: TimeoutOptions = { status: 408 }) {
  return (ctx: ParameterizedContext, next: Next): Promise<void> => {
    let timer: NodeJS.Timeout; 

    const timeout = new Promise((_, reject) => {
      timer = setTimeout(() => {
        ctx.state.timeout = true;
        ctx.status = status;
        ctx.body = {}; 

        reject(new Error(`Request timed out: ${time}ms`));
      }, time);
    });

    return Promise.race([ timeout, next() ])
      .then(() => clearTimeout(timer))
      .catch((exception) => {
        if (ctx.state.timeout) return ctx.throw(status, "Request timeout");
        throw exception;
      });
  };
}
