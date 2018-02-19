'use strict';

const Koa = require('koa');
const serverless = require('serverless-http');

var server = module.exports = new Koa();

const path = require( 'path' );
const fs = require( 'fs' );

const app = require( './app.js' );
const template = fs.readFileSync( path.join( __dirname, '../templates/index.html' ), 'utf-8' );

server.use(async function(ctx) {
	const match = /\/page\/(\d+)/.exec( ctx.url );
	const page = match ? +match[1] : 1;

	const html = app.render({ page: page });
	ctx.body = template.replace( '<!-- HTML -->', html );
	ctx.type = 'html';
});

module.exports.handler = serverless(server);
