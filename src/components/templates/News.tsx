import React from 'react';
import {observer} from 'mobx-react-lite'
import {Text, TextType} from '../atoms';
import {useStore} from '../../store/storeConfig'
import {Box} from "@material-ui/core";
import RootStore from "../../store/root.store";

const News: React.FC = observer(() => {
    const store :RootStore = useStore();
    return (<Box flexDirection={'column'}>
        {store.newsFlashCollection.map((news) => {
            const date :null|string = news.date ==null ? '': new Date(news.date).toLocaleDateString();
            return <Box border ={1} borderColor='#6495ed'>
                <Text  type={TextType.NEWS_FLASH_TITLE} children={`${date}, ${news.source}` }/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </Box>
        })}
    </Box>);
});

export default News;
