import React, { FC } from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';
import { useQuery } from '../utils/utils';

interface IProps {}

// Used to redirect from root page to latest newsflash
const HomePageRedirect: FC<IProps> = () => {
  const store: RootStore = useStore();
  const isUpdateUser = useQuery().get('updateUser') === 'true';
  const defaultId = store?.newsFlashCollection[0]?.id;
  return defaultId ? <Redirect to={`/newsflash/${defaultId}${isUpdateUser?'?updateUser=true' : ''}`} /> : null;
};

export default observer(HomePageRedirect);
