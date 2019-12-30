import React from 'react';
import {newsApiDummy} from '../../assets/news-api-dummy';
import {Text, TextType} from '../atoms/Text';
import {Box} from "@material-ui/core";

const News: React.FC = () => {
    return (<Box flexDirection={'column'}>
        {newsApiDummy.map((news) => {
            const date :Date = new Date(news.date);
            return <Box border ={1} borderColor='#6495ed'>
                <Text  type={TextType.NEWS_FLASH_TITLE} children={date.getTime() + ',' + date.toLocaleDateString()+ ', ' + news.source }/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </Box>
        })}
    </Box>);
};

export default News;