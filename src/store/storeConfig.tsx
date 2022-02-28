// https://mobx-react.js.org/recipes-context

import React from 'react';
import { isProd } from 'utils/env.utils';
import RootStore from './root.store';
import UserStore from 'store/userStore';
import SettingsStore from './settings.store';
import NewsFlashStore from './newsFlashStore';
import WidgetStore from './widgetStore'

// const store = new RootStore();
export interface IStore {
  rootStore: RootStore;
  userStore: UserStore;
  settingsStore: SettingsStore;
  newsFlashStore: NewsFlashStore;
  widgetStore: WidgetStore;
}

export const store: IStore = {
  rootStore: new RootStore(),
  userStore: new UserStore(),
  settingsStore: new SettingsStore(),
  newsFlashStore: new NewsFlashStore(),
  widgetStore: new WidgetStore()
};

export const StoreContext = React.createContext(store);

export const useStore = () => {
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
