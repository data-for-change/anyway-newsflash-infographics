import axios from 'axios';
import { INewsFlash } from 'models/NewFlash';
import { showDemoCards } from 'utils/utils';
import { addDemoNewsflash } from './mocks/mock.service';

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

const NEWS_FLASH_API: string = '/api/news-flash-v2';

export function fetchNews(source = '', offSet = 0, limit = 100): Promise<any> {
  const query = [];
  if (source) {
    query.push(`source=${source}`);
  }
  if (limit) {
    query.push(`limit=${limit}`);
  }
  query.push(`offset=${offSet}`);

  // temporary according to request from Atalya
  query.push('resolution=street&resolution=suburban_road');

  const url = `${NEWS_FLASH_API}?${query.join('&')}`;

  return (
    axios
      .get(url)
      .then((res) => res.data)
      // if showDemoCards - add demoNewsflash to newsflash data
      .then((data) => (showDemoCards ? addDemoNewsflash(data) : data))
      .catch(onErrorFetchNewsFlash)
  );
}

function onErrorFetchNewsFlash() {
  const errorArr: Array<INewsFlash> = new Array<INewsFlash>();
  errorArr.push(errorNews);
  return errorArr;
}
