import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box} from "@material-ui/core";
import {Text, TextType} from '../atoms/Text';
import {useStore} from "../../store/storeConfig";
import RootStore from "../../store/root.store";


const News: React.FC = observer(() => {
    const store: RootStore = useStore();
    return (<Box flexDirection={'column'} flexGrow={1}>
        {store.newsFlashCollection.map((news) => {
            return <Box border={1} borderColor='#6495ed'>
                <Text type={TextType.NEWS_FLASH_TITLE} children={`${new Date(news.date).toLocaleDateString()}, ${news.source}`}/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </Box>
        })}
    </Box>);
});

export default News;