import { createHistory } from 'svelte-routing';
import App from '../shared/App.html';

createHistory('browser');

const app = new App({
  target: document.getElementById('app'),
  hydrate: true
});
