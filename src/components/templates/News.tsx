import React from 'react';
import {newsApiDummy} from '../../assets/news-api-dummy';
import {Text, TextType} from '../atoms/Text';

const News: React.FC = () => {
    return (<div>
        {newsApiDummy.map((news) => {
            return <div>
                <Text type={TextType.NEWS_FLASH_TITLE} children={news.source}/>
                <Text type={TextType.NEWS_FLASH_TITLE} children={news.date}/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </div>
        })}
    </div>);
};

export default News;