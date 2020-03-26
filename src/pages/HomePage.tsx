import React, {FunctionComponent} from 'react'
import WidgetsTemplate from '../components/templates/WidgetsTemplate'
import {Box} from '@material-ui/core'
import SideBar from '../components/templates/SideBar'
import makeStyles from "@material-ui/core/styles/makeStyles";
import {RouteComponentProps} from 'react-router';
import {borderColor} from '../style/_globals';

interface IProps {}

interface IRouteProps {
  id?: string
}

const useStyles = makeStyles({
  mainBox: {
    height: 'inherit'
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
      <Box flexGrow={1} display='flex' borderLeft={1} borderColor={borderColor}>
        <SideBar />
      </Box>
      <Box flexGrow={5} className={classes.widgetBox}>
        <WidgetsTemplate id={id}/>
      </Box>
    </Box>
  );
};

export default HomePage;
