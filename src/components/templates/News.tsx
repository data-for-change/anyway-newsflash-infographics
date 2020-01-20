import React from 'react';
import {observer} from 'mobx-react-lite';
import {Box, makeStyles} from "@material-ui/core";
import {Text, TextType} from '../atoms/Text';
import {useStore} from "../../store/storeConfig";
import RootStore from "../../store/root.store";


const News: React.FC = observer(() => {
    const useStyles = makeStyles({
        container: {
            flexDirection: 'column',
            flexGrow: 1
        },
        newsFlash: {
            border: 1,
            borderColor: '#6495ed'
        }

    })
    const store: RootStore = useStore();
    const classes = useStyles();
    return (<Box className={classes.container}>
        {store.newsFlashCollection.map((news) => {
            return <Box className={classes.newsFlash} >
                <Text type={TextType.NEWS_FLASH_TITLE} children={`${new Date(news.date).toLocaleDateString()}, ${news.source}`}/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </Box>
        })}
    </Box>);
});

export default News;