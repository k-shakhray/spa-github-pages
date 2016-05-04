import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';

///////////////////////////////////////////////////////////////////////////////
// redirect for github pages, b/c gh-pages are always availble at /my-repo-name
// https://help.github.com/articles/custom-domain-redirects-for-github-pages-sites/
// SET THIS: e.g. my-repo-name
const githubRepoName = 'react-github-pages';
// the custom domain where the site is located
// SET THIS: e.g. http://subdomain.example.tld, or http://www.example.tld
const domain = `http://${githubRepoName}.${window.location.host.replace('www.', '')}`;
function redirectToDomain() {
  window.location.replace(domain)
}
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
function checkForRedirectQuery(nextState, replace) {
  const query = nextState.location.query
  if (query.redirect) {
    let redirectTo = {}

    if (typeof query.pathname === 'string' && query.pathname !== '') {
      redirectTo.pathname = query.pathname;
    }

    if (typeof query.query === 'string' && query.query !== '') {
      let queryObject = {};
      query.query.split('&').map( q => q.split('=') ).forEach( arr => {
        queryObject[arr[0]] = arr.slice(1).join('=');
      })
      redirectTo.query = queryObject;
    }

    if (typeof query.hash === 'string' && query.hash !== '') {
      redirectTo.hash = `#${query.hash}`
    }

    replace(redirectTo)
  }
}
///////////////////////////////////////////////////////////////////////////////


const routes = (
  <Route path="/" component={App} onEnter={checkForRedirectQuery}>
    <IndexRoute component={Home} />

    // redirect for github pages
    <Route path={githubRepoName} onEnter={redirectToDomain} />
    <Route path="*" component={PageNotFound} />
  </Route>
);

render(
  <Router history={browserHistory}>{routes}</Router>,
  document.getElementById('root')
)
