// https://mobx-react.js.org/recipes-context

import React from 'react';
import { isProd } from 'utils/env.utils';
import RootStore from './root.store';

const store = new RootStore();
export const StoreContext = React.createContext(store);

export const useStore = (): RootStore => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};

// see: https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
if (!isProd) {
  // @ts-ignore
  window['store'] = store;
}
