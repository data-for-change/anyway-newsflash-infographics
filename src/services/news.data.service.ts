import axios from 'axios';
import { INewsFlash } from 'models/NewFlash';
import { showDemoCards } from 'utils/utils';
import { addDemoNewsflash } from './mocks/mock.service';
import { isProd } from 'utils/env.utils';

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

export function fetchNews(source = '', offSet = 0, limit = 100): Promise<any> {
  const query = [];
  if (source) {
    query.push(`source=${source}`);
  }
  if (limit) {
    query.push(`limit=${limit}`);
  }
  query.push(`offset=${offSet}`);

  query.push('resolution=suburban_road');

  if (!isProd) {
    query.push('resolution=street');
  }
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
