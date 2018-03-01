require('@std/esm');
require('svelte/ssr/register');

const { createHistory } = require('../../router/index');
const app = require('../../shared/App.html');
const serverless = require('serverless-http');
const history = createHistory('memory');
const Koa = require('koa');
const server = new Koa();
const route = require('koa-route');

server.use(route.get('/foo', (ctx) => { ctx.body = "bar"; }));

server.use(async function(ctx) {
  history.replace(ctx.url);

  ctx.body = `
    <!DOCTYPE html>
    <link rel="stylesheet" href="/styles.css">
    <div id="app">${app.render()}</div>
    <script src="/bundle.js"></script>
  `;
  ctx.type = 'html';
});

module.exports.handler = serverless(server);
