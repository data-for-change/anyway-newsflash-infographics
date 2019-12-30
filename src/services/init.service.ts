import {fetchNews} from './data.service';

export function initService(): Promise<any> {
  const promiseArray = [
    fetchNews(),
    /* add promises here */
  ];
  return Promise.all(promiseArray)
    .then(promiseCollection => ({
      // return object - resolved data from all promises
      newsFlashCollection: promiseCollection[0],
    }))
}
