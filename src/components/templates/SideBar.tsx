import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import News from '../organisms/News';
import { NewsFlashFilterPanel } from '../molecules/NewsFlashFilterPanel';
import LocationMap from '../molecules/LocationMap';
import { borderColor } from '../../style/_globals';
import { Text, TextType, ErrorBoundary } from '../atoms';

interface IProps {}

const useStyles = makeStyles({
  newsContainer: {
    overflow: 'auto',
  },
  newsFeed: {
    overflow: 'auto',
  },
});

const SideBar: FC<IProps> = () => {
  const classes = useStyles();
  const mapTitle = 'מיקום משוער:';

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="stretch">
      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        className={classes.newsContainer}
        border={1}
        borderColor={borderColor}
      >
        <ErrorBoundary>
          <NewsFlashFilterPanel />
        </ErrorBoundary>
        <Box flexGrow={1} display="flex" flexDirection="column" className={classes.newsFeed}>
          <Box flexGrow={1}>
            <News />
          </Box>
        </Box>
      </Box>
      <Box flexShrink={0} flexGrow={0} p={1}>
        <Text type={TextType.CONTENT_TITLE} children={mapTitle} />
      </Box>
      <Box flexBasis={300} flexShrink={0} px={1} pb={1}>
        <ErrorBoundary>
          <LocationMap data={[{ latitude: 32.0853, longitude: 34.7818 }]} center={{ lat: 32.0853, lng: 34.7818 }} />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default SideBar;
