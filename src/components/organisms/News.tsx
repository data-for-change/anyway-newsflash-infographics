import React from 'react';
import { AnywayLink, Text, TextType } from '../atoms';
import { Box, makeStyles } from '@material-ui/core';
import { borderColor } from '../../style/_globals';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles({
  container:{
    maxHeight: "300px"
  }
});

const News: React.FC = () => {
  const store: RootStore = useStore();
  const classes = useStyles();

  return (
    <Box className={classes.container} flexDirection={'column'}>
      {store.newsFlashCollection.length > 0 ?
      store.newsFlashCollection.map((news) => {
        const date: null | string = news.date == null ? '' : new Date(news.date.replace(/-/g, "/")).toLocaleDateString();
        return (
          <AnywayLink key={news.id} to={`/newsflash/${news.id}`}>
            <Box border={1} borderColor={borderColor} p={1}>
              <Text type={TextType.NEWS_FLASH_TITLE} children={`${date}, ${news.source}`} />
              <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title} />
            </Box>
          </AnywayLink>
        );
        }) :
        <Box p={1}>
          <Text type={TextType.NEWS_FLASH_CONTENT}>לא נמצאו תוצאות מהמקור המבוקש</Text>
        </Box>
      }
    </Box>
  );
};

export default observer(News);
