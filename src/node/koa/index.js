const http = require('http');
const compose = require('./compose');

class Koa {
  constructor() {
    this.middleware = [];
  }

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  callback() {
    const fn = compose(this.middleware);

    const handleRequest = ((req, res) => {
      const ctx = { req, res };
      return this.handleRequest(ctx, fn);
    })
    return handleRequest;
  }

  handleRequest(ctx, fnMiddleware) {
    const handleResponse = () => this.handleResponse(ctx);
    return fnMiddleware(ctx)
      .then(handleResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  handleResponse(ctx) {
    ctx.res.end('succeed');
  }
}

module.exports = Koa;
