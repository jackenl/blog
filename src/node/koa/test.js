const Koa = require('./index');

const app = new Koa();

app.use((ctx, next) => {
  console.log('middleware1 start');
  next();
  console.log('middleware1 end');
})

app.use((ctx, next) => {
  console.log('middleware2 start');
  next();
  console.log('middleware2 end');
})

app.use((ctx, next) => {
  console.log('middleware3 start');
  next();
  console.log('middleware3 end');
})

app.listen(3000, '127.0.0.1', () => {
  console.log('server is started in port:3000');
});
