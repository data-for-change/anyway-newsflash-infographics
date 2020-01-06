import React from 'react';
import { TextType} from '../atoms/Text';
import Text from '../atoms/Text';
import {Box} from "@material-ui/core";
import RootStore from "../../store/root.store";

const News: React.FC = () => {

    const store :RootStore = new RootStore();
    return (<Box flexDirection={'column'}>
        {store.newsFlashCollection.map((news) => {
            const date :Date = new Date(news.date);
            return <Box border ={1} borderColor='#6495ed'>
                <Text  type={TextType.NEWS_FLASH_TITLE} children={`${date.toLocaleDateString()}, ${news.source}` }/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </Box>
        })}
    </Box>);
};

export default News;