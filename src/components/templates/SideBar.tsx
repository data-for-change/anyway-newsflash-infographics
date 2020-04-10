import React, {FunctionComponent} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Text, TextType, ErrorBoundary} from '../atoms'
import News from './News';
import {NewsFlashFilterPanel} from '../molecules/NewsFlashFilterPanel';
import LocationMap from '../molecules/LocationMap';
import {borderColor} from '../../style/_globals';

interface IProps {}

const useStyles = makeStyles({
  newsContainer: {
    overflow: "auto"
  },
  newsFeed: {
    overflow: "auto"
  }
});

const SideBar: FunctionComponent<IProps> = () => {
  const classes = useStyles();
  const mapTitle = "מיקום משוער:"
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <Box display='flex' flexDirection='column' flexGrow={1} className={classes.newsContainer}
           border={1} borderColor={borderColor}>
        <ErrorBoundary>
          <NewsFlashFilterPanel />
        </ErrorBoundary>
        <Box display="flex" flexDirection="column" className={classes.newsFeed}>
          <Box flexGrow={1}>
            <News />
          </Box>
        </Box>
      </Box>
      <Box flexBasis={300} flexShrink={0} m={0} >
        <Text type={TextType.PAGE_TITLE} children={mapTitle} />
        <ErrorBoundary>
          <LocationMap
            data={[{ latitude: 32.0853, longitude: 34.7818 }]}
            center={{ lat: 32.0853, lng: 34.7818 }}
          />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default SideBar;
