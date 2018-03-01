import commonjs from 'rollup-plugin-commonjs';
// import livereload from 'rollup-plugin-livereload';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
// import uglify from 'rollup-plugin-uglify';

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
    commonjs(), // converts date-fns to ES modules
    // livereload({ watch: 'public' }),
    replace({ 'process.env.NODE_ENV': '"production"' }),
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }), // tells Rollup how to find date-fns in node_modules
    svelte({
      css: function (css) {
            // creates `main.css` and `main.css.map` — pass `false`
            // as the second argument if you don't want the sourcemap
            css.write('public/build/styles.css');
          },
      hydratable: true
    }),
    // production && uglify() // minify, but only in production
  ]
};
