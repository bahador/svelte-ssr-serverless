import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import uglify from 'rollup-plugin-uglify';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'client/app.js',
	output: {
		file: 'public/build/bundle.js',
		format: 'iife',
		// sourcemap: true
	},
	plugins: [
	    babel({
	      exclude: ['node_modules/**', '**/*.html']
	    }),
    	commonjs(), // converts date-fns to ES modules
	    resolve(), // tells Rollup how to find date-fns in node_modules
		svelte({
			css: false, // already present on page
			hydratable: true
		}),
		production && uglify() // minify, but only in production
	]
};
