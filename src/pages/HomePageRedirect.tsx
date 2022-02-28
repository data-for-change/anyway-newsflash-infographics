import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';

interface IProps {}

// Used to redirect from root page to latest newsflash
const HomePageRedirect: FC<IProps> = () => {
  const store = useStore().newsFlashStore;
  const defaultId = store?.newsFlashCollection[0]?.id;
  return defaultId ? <Redirect to={`/newsflash/${defaultId}`} /> : null;
};

export default observer(HomePageRedirect);
