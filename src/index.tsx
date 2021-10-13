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
