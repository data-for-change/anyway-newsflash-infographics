import React from 'react';
import {newsApiDummy} from '../../assets/news-api-dummy';
import {Text, TextType} from '../atoms/Text';

const News: React.FC = () => {
    return (<div>
        {newsApiDummy.map((news) => {
            const date :Date = new Date(news.date);
            return <div>
                <Text type={TextType.NEWS_FLASH_TITLE} children={ date.toLocaleDateString()+ ', ' + news.source }/>
                <Text type={TextType.NEWS_FLASH_CONTENT} children={news.title}/>
            </div>
        })}
    </div>);
};

export default News;