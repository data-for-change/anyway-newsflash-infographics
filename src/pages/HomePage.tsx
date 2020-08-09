import React, {FC} from 'react';
import WidgetsTemplate from '../components/organisms/WidgetsTemplate';
import { Box } from '@material-ui/core';
import SideBar from '../components/organisms/SideBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { RouteComponentProps, Redirect,useLocation } from 'react-router';
import { borderColor } from '../style';
import FilterBar from '../components/organisms/FilterBar';
import OverlayLoader from '../components/molecules/OverlayLoader';
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/storeConfig';
import RootStore from '../store/root.store';
import queryString from 'query-string';


interface IProps {}

interface IRouteProps {
  id?: string;
}

const useStyles = makeStyles({
  mainBox: {
    height: 'inherit',
  },

  widgetBox: {
    height: 'inherit',
    overflow: 'auto',
  },
});

const HomePage: FC<IProps & RouteComponentProps<IRouteProps>> = ({ match }) => {
  const classes = useStyles();
  const store: RootStore = useStore();

  const id = match.params.id ? parseInt(match.params.id) : null;
  const queryParam : string|null= useLocation().search;
  const filterValue :number|null  = queryParam ? parseInt(queryString.parse(queryParam)["years_ago"] as string ): null;
  const loading = store.widgetBoxLoading;

  if (!id) {
    return <Redirect to="/" />;
  }

  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={1} maxWidth={319} display="flex" borderLeft={1} borderColor={borderColor}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <OverlayLoader show={loading} />
        <FilterBar />
        <WidgetsTemplate id={id} filterValue={filterValue} />
      </Box>
    </Box>
  );
};

export default observer(HomePage);
