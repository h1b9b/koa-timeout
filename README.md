<h1 align="center">Koa Timeout Middleware</h1>

<p align="center">
  <i>
    A <b><a href="http://koajs.com">Koa</a></b> middleware to handle requests timeouts
  </i>
</p>

<p align="center">
  <b><a href="#hot-it-works">How it works</a></b>
  |
  <b><a href="#installation">Install</a></b>
  |
  <b><a href="#usage">Usage</a></b>
</p>

## How it works

`koa-timeout-middleware` uses
[`Promise.race`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
to race a `setTimeout` against your **Koa** middlewares/response.

## Installation

The middleware is available on [npm](https://npmjs.com)

```sh
# npm install
npm install --save koa-timeout-middleware
# yarn install
yarn add koa-timeout-middleware
```

## Usage

The middleware can be configured with a _custom_ timeout time and
status code.

```js
import Koa from 'koa'
import { timeout } from 'koa-timeout-middleware'

const app = new Koa()

app.use(timeout(1000))                     // 1s timeout
app.use(timeout(1000, { status: 499 }))    // 1s timeout with 499 status
```


