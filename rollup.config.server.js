import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'server/server.js',
	output: {
		file: 'server/build/server.js',
		format: 'cjs',
		// sourcemap: true
	},
	plugins: [
	    typescript(),
		commonjs(), // converts date-fns to ES modules
	    resolve(), // tells Rollup how to find date-fns in node_modules
		production && uglify() // minify, but only in production
	]
};
