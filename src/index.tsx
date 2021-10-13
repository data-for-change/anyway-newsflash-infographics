import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './services/i18n.service';
import * as serviceWorker from './serviceWorker';
import OverlayLoader from './components/molecules/OverlayLoader';
import { ErrorBoundary } from 'components/atoms';

ReactDOM.render(
  <Suspense fallback={<OverlayLoader show />}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Suspense>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// treat unhandled errors
// see https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror
// https://stackoverflow.com/questions/64318300/react-global-error-handler-not-working-for-async-componentdidmount-tried-both-c/64319415#64319415
window.addEventListener('error', function (event) {
  console.error(event);
  // add logs server - 796
});

window.onunhandledrejection = (e: PromiseRejectionEvent) => {
  console.error(e);
  throw new Error(e.reason.stack);
};
