import {INewsFlash} from '../models/NewFlash';
import {mockHTTPCall, newsFlashCollectionData} from './mocks/mock.service';
import axios from 'axios';

const errorNews: INewsFlash = {
  lat:-1,
  lon: -1,
  source: 'Error',
  id: -1,
  title: 'Error fetching News',
  date: null
};

const NEWS_FLASH_API: string = '/api/news-flash-filters?';
const SOURCE_QUERY = 'source=';
const NUM_OF_NEWS = 'news_flash_count=';

export function fetchNews(source = 'walla', count = 5, useMockData = false): Promise<any> {

  return useMockData? mockHTTPCall<Array<INewsFlash|any >>(newsFlashCollectionData): axios.get(`${NEWS_FLASH_API}&${SOURCE_QUERY + source}&${NUM_OF_NEWS + count}`)
      .then (res=>res.data).catch(onErrorFetchNewsFlash);
}

function onErrorFetchNewsFlash() {
  const errorArr: Array<INewsFlash> = new Array<INewsFlash>();
  errorArr.push(errorNews);
  return errorArr;
}

