import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import OverlayLoader from 'components/molecules/OverlayLoader';
import FilterBar from 'components/organisms/FilterBar';
import SideBar from 'components/organisms/SideBar';
import { observer } from 'mobx-react-lite';
import React, { FC, useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';
import WidgetsTemplate from '../components/organisms/WidgetsTemplate';
import { silverSmokeColor } from '../style';
import DemoPage from './DemoPage';
import { LANG } from 'const/languages.const';

const PREFIX = 'HomePage';

const classes = {
  mainBox: `${PREFIX}-mainBox`,
  widgetBox: `${PREFIX}-widgetBox`,
  sideBarWrapper: `${PREFIX}-sideBarWrapper`,
};

const StyledBox = styled(Box)({
  [`&.${classes.mainBox}`]: {
    height: 'inherit',
  },

  [`& .${classes.widgetBox}`]: {
    height: 'inherit',
    overflow: 'auto',
  },
  [`& .${classes.sideBarWrapper}`]: {
    borderInlineEnd: `1px solid ${silverSmokeColor}`,
  },
});

interface IProps {}

interface IRouteProps {
  id?: string;
  lng?: string;
}

const HomePage: FC<IProps & RouteComponentProps<IRouteProps>> = ({ match }) => {
  const store: RootStore = useStore();
  const id = match.params.id ? parseInt(match.params.id) : null;
  const loading = store.widgetBoxLoading;

  useEffect(() => {
    if (id) {
      store.selectNewsFlash(id);
    }
  }, [id, store]);

  useEffect(() => {
    if (match.params.lng) {
      store.changeLanguage(match.params.lng);
    } else {
      store.changeLanguage(LANG.HE);
    }
  }, [match.params.lng, store]);

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <StyledBox display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} width={319} display="flex" className={classes.sideBarWrapper}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        {/* main Content */}
        <Switch>
          <Route path="/:lng?/newsflash/999" component={DemoPage} />
          <Route path="/:lng?/newsflash/:id" component={WidgetsTemplate} />
        </Switch>
      </Box>
    </StyledBox>
  );
};

export default observer(HomePage);
