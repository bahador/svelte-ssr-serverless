'use strict';

const Koa = require('koa');
// const serverless = require('serverless-http');
const { createHistory } = require('svelte-routing');
const server = module.exports = new Koa();
const history = createHistory('memory');


const path = require( 'path' );
const fs = require( 'fs' );

const app = require( './app.js' );
const template = fs.readFileSync( path.join( __dirname, '../templates/index.html' ), 'utf-8' );

server.use(async function(ctx) {
    history.replace(ctx.url);

    const html = app.render();

	ctx.body = template.replace( '<!-- HTML -->', html );
	ctx.type = 'html';
});

// module.exports.handler = serverless(server);

if (!module.parent) app.listen(3000);