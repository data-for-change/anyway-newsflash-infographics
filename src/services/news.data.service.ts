import { INewsFlash } from '../models/NewFlash';
// import {mockHTTPCall, newsFlashCollectionData} from './mocks/mock.service';
import axios from 'axios';

const errorNews: INewsFlash = {
  lat: -1,
  lon: -1,
  source: 'Error',
  id: -1,
  title: 'Error fetching News',
  date: null,
  accident: false,
  author: '',
  link: '',
  description: '',
  display_source: '',
  location: '',
};

const NEWS_FLASH_API: string = '/api/news-flash';

// export  function mockFetchNews(source = '', count = 5, useMockData = false): Promise<any> {
//   console.log('== mockFetchNews ==', source, count);
//   return  mockHTTPCall<Array<INewsFlash | any>>(newsFlashCollectionData);
// }

export function fetchNews(source = '', count = 5): Promise<any> {
  const query = [];
  if (source) {
    query.push(`source=${source}`);
  }
  if (count) {
    query.push(`news_flash_count=${count}`);
  }
  // temporary according to request from Atalya
  query.push('road_segment_only=true&interurban_only=true');

  const url = `${NEWS_FLASH_API}?${query.join('&')}`;
  // return mockHTTPCall<Array<INewsFlash | any>>(newsFlashCollectionData);
  return axios
    .get(url)
    .then((res) => res.data)
    .catch(onErrorFetchNewsFlash);
}

function onErrorFetchNewsFlash() {
  const errorArr: Array<INewsFlash> = new Array<INewsFlash>();
  errorArr.push(errorNews);
  return errorArr;
}
