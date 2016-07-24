const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const convert = require('koa-convert');

//
// Web Application
//
const app = new Koa();
const publicFiles = serve(path.join(__dirname, 'public'));
publicFiles._name = 'static /public';
app.use(convert(publicFiles));

//
// x-response-time
//
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

//
// Logger
//
app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// default page
app.use(ctx => {
  ctx.body = '<center><h1>Powered By Gary Ascuy {gary.ascuy@gmail.com}</h1></center>';
});

//
// HTTP/HTTPS Serve
//
const port = process.env.PORT || 3666
app.listen(port);
console.log(`Koa Server listening at port ${port}`);
console.log('Serial Servo Controller Web Application - Press ctrl+c to exit.');
