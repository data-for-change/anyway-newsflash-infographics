import React, { FC } from 'react';
import { Navigate } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';

interface IProps {}

// Used to redirect from root page to latest newsflash
const HomePageRedirect: FC<IProps> = () => {
  const store: RootStore = useStore();
  const { newsFlashStore } = store;
  const defaultId = newsFlashStore?.newsFlashCollection[0]?.id;
  return defaultId ? <Navigate to={`/newsflash/${defaultId}`} replace /> : null;
};

export default observer(HomePageRedirect);
