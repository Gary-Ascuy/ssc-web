const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const IO = require('koa-socket');
const convert = require('koa-convert');

//
// Web Application
//
const app = new Koa();
const io = new IO();

const publicFiles = serve(path.join(__dirname, 'public'));
publicFiles._name = 'static /public';
app.use(convert(publicFiles));

//
// x-response-time
//
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

//
// Logger
//
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// default page
app.use(ctx => {
  ctx.body = '<center><h1>Powered By Gary Ascuy {gary.ascuy@gmail.com}</h1></center>';
});

io.on( 'message', (ctx, data) => {
  console.log(`message: ${ data }`);
});

//
// HTTP/HTTPS Serve
//
const port = process.env.PORT || 3666;
io.attach(app);
app.listen(port);
console.log(`Koa Server listening at port ${port}`);
console.log('Serial Servo Controller Web Application - Press ctrl+c to exit.');
