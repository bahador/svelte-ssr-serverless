import { createHistory } from '../router/index';
import App from '../shared/App.html';

createHistory('browser');

const app = new App({
  target: document.getElementById('app'),
  hydrate: true
});
