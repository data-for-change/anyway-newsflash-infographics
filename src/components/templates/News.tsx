import React, {useCallback} from 'react';
import {Button, Text, TextType} from '../atoms';
import {Box} from "@material-ui/core";
import {useStore} from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import {observer} from 'mobx-react-lite';

const News: React.FC = () => {
  const store: RootStore = useStore();
  
  const onNewsClick = useCallback((id: number) => {
    store.selectNewsFlash(id)
  }, [store]);
  
  return (<Box flexDirection={'column'}>
    {store.newsFlashCollection.map((news) => {
      const date: Date = new Date();
      return <Button key={news.id} onClick={onNewsClick.bind(null, news.id)}>
        <Box border={1} borderColor='#6495ed'>
          <Text type={TextType.NEWS_FLASH_TITLE} children={`${date.toLocaleDateString()}, ${news.source}`}/>
          <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
        </Box>
      </Button>
    })}
  </Box>);
};

export default observer(News);
