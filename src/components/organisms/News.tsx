import React, { FC } from 'react';
import { AnywayLink, Text, TextType } from '../atoms';
import { Box, makeStyles } from '@material-ui/core';
import { borderColor, selectedNewsFlash } from '../../style/_globals';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles({
  container: {},
  newsFeed: {
    overflow: 'auto',
  },
  activeNewsFlash: {
    backgroundColor: selectedNewsFlash,
  },
});

const News: FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();

  return (
    <Box flexGrow={1} display="flex" flexDirection="column" className={classes.newsFeed}>
      <Box flexGrow={1}>
        <Box className={classes.container} flexDirection={'column'}>
          {store.newsFlashCollection.length > 0 ? (
            store.newsFlashCollection.map((news) => {
              const className = news.id === store.activeNewsFlashId ? classes.activeNewsFlash : '';
              const date = news.date == null ? '' : new Date(news.date.replace(/-/g, '/')).toLocaleDateString();
              return (
                <AnywayLink key={news.id} to={`/newsflash/${news.id}`}>
                  <Box border={1} borderColor={borderColor} p={1} className={className}>
                    <Text type={TextType.NEWS_FLASH_TITLE} children={`${date}, ${news.source}`} />
                    <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title} />
                  </Box>
                </AnywayLink>
              );
            })
          ) : (
            <Box p={1}>
              <Text type={TextType.NEWS_FLASH_CONTENT}>לא נמצאו תוצאות מהמקור המבוקש</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default observer(News);
