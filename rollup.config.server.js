import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import uglify from 'rollup-plugin-uglify';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'shared/App.html',
	output: {
		file: 'server/build/app.js',
		format: 'cjs',
		// sourcemap: true
	},
	plugins: [
		commonjs(), // converts date-fns to ES modules
	    resolve(), // tells Rollup how to find date-fns in node_modules
		svelte({
			css: function (css) {
		        // creates `main.css` and `main.css.map` — pass `false`
		        // as the second argument if you don't want the sourcemap
		        css.write('public/build/main.css');
	        },
			generate: 'ssr'
		}),
		production && uglify() // minify, but only in production
	]
};
