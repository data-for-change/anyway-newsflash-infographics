import React, { Suspense } from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './services/i18n.service';
import * as serviceWorker from './serviceWorker';
import OverlayLoader from './components/molecules/OverlayLoader';

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

ReactDOM.render(
  <Suspense fallback={<OverlayLoader show />}>
    <StylesProvider jss={jss}>
      <App />
    </StylesProvider>
  </Suspense>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
