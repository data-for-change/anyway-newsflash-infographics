import {fetchNews} from './news.data.service';
import {fetchDefaultWidgets} from './widgets.data.service';

export function initService(): Promise<any> {
  const promiseArray = [
    fetchNews(),
    fetchDefaultWidgets(),
    /* add promises here */
  ];

  return Promise.all(promiseArray)
    .then((promiseCollection) => ({
      // return object - resolved data from all promises
      newsFlashCollection: promiseCollection[0],
      widget: promiseCollection[1],
    }))
}
