import React, {FunctionComponent} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import News from './News';
import {NewsFlashFilterPanel} from '../atoms/NewsFlahsFilterPanel';
import LocationMap from '../molecules/LocationMap';
import {borderColor} from '../../style/_globals';

interface IProps {
}

const useStyles = makeStyles({
  newsContainer: {
    overflow: 'auto'
  },
  newsFeed: {
    overflow: 'auto'
  },
});

const SideBar: FunctionComponent<IProps> = () => {
  const classes = useStyles();

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
    >
      <Box display='flex' flexDirection='column' flexGrow={1} className={classes.newsContainer} pt={1}
           border={1} borderColor={borderColor}>
          <NewsFlashFilterPanel/>
          <Box display='flex' flexDirection='column' className={classes.newsFeed}>
            <Box flexGrow={1}>
              <News/>
            </Box>
          </Box>
      </Box>
      <Box flexBasis={300} flexShrink={0} p={1}>
        <LocationMap data={[{latitude: 32.0853, longitude: 34.7818}]} center={{lat: 32.0853, lng: 34.7818}}/>
      </Box>
    </Box>
  );
};

export default SideBar;
