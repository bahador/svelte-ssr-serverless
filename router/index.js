const createMemoryHistory = require('history/createMemoryHistory').default;
const createHashHistory = require('history/createHashHistory').default;
const createBrowserHistory = require('history/createBrowserHistory').default;

let history;

const createHistory = type => {
  switch (type) {
    case 'memory':
      history = createMemoryHistory();
      break;
    case 'hash':
      history = createHashHistory();
      break;
    case 'browser':
    default:
      history = createBrowserHistory();
      break;
  }

  return history;
};

const getHistory = () => history;
const isModifiedEvent = event => {
  return Boolean(
    event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
  );
};

module.exports.matchPath = require('./matchPath.js');
module.exports.getHistory = getHistory;
module.exports.createHistory = createHistory;
module.exports.isModifiedEvent = isModifiedEvent;
