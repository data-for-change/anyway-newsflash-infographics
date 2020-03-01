import React, {useCallback} from 'react';
import {AnywayLink, Text, TextType} from '../atoms';
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
      const date :null|string = news.date ==null ? '': new Date(news.date).toLocaleDateString();
      return <AnywayLink key={news.id} onClick={onNewsClick.bind(null, news.id)}>
        <Box border={1} borderColor='#6495ed'>
          <Text type={TextType.NEWS_FLASH_TITLE} children={`${date}, ${news.source}` }/>
          <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
        </Box>
      </AnywayLink>
    })}
  </Box>);
};


export default observer(News);
