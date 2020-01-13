import React from 'react';
import { TextType} from '../atoms/Text';
import Text from '../atoms/Text';
import {Box} from "@material-ui/core";
import {useStore} from "../../store/storeConfig";
import RootStore from "../../store/root.store";
import {observer} from 'mobx-react-lite';


const News: React.FC = observer(() => {
    const store :RootStore = useStore();
    //while(!store.appInitialized);
    return (<Box flexDirection={'column'} flexGrow={1}>
        {store.newsFlashCollection.map((news) => {
            const date :Date = new Date(news.date);
            return <Box border ={1} borderColor='#6495ed'>
                <Text  type={TextType.NEWS_FLASH_TITLE} children={`${date.toLocaleDateString()}, ${news.source}` }/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </Box>
        })}
    </Box>);
});

export default  News;