import React, {FunctionComponent} from 'react'
import WidgetsTemplate from '../components/templates/WidgetsTemplate'
import {Box} from '@material-ui/core'
import {SideBar} from '../components/templates/SideBar'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RouteComponentProps} from 'react-router';
import LocationMap from '../components/molecules/LocationMap';

interface IProps {}

interface IRouteProps {
  id?: string
}

const useStyles = makeStyles({
  mainBox: {
    height: 'inherit'
  },
  sideBarBox: {
    height: 'inherit',
    overflow: 'auto'
  },
  widgetBox: {
    height: 'inherit',
    overflow: 'auto'
  }
});

const HomePage: FunctionComponent<IProps & RouteComponentProps<IRouteProps>> = ({match}) => {
  const classes = useStyles();
  const id = match.params.id ? parseInt(match.params.id) : null;

  return (
    <Box display='flex' flexGrow={1} className={classes.mainBox}>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='stretch'
      >
        <Box flexBasis={300} flexShrink={0} className={classes.sideBarBox}>
          <SideBar />
        </Box>
        <Box flexBasis={300} flexShrink={0} className={classes.sideBarBox}>
          <LocationMap marker={{ lat: 32.0853, lng: 34.7818 }} />
        </Box>
      </Box>
      <Box flexGrow={1} className={classes.widgetBox}>
        <WidgetsTemplate id={id}/>
      </Box>
    </Box>
  );
};

export default HomePage;
