import axios from 'axios';
import { fetchNews } from './news.data.service';
import L from 'leaflet';
import { serverUrl } from 'const/generalConst';
import { getNewsIdFromUrl } from 'utils/url.utils';

export function initService(): Promise<any> {
  setAxiosDefaults();
  setLocationMapDefaults();

  const queryParams = getNewsIdFromUrl();
  const promiseArray = [fetchNews(queryParams)];

  return Promise.all(promiseArray).then((promiseCollection) => ({
    newsFlashCollection: promiseCollection[0],
    newsFlashWidgetsData: promiseCollection[1],
  }));
}

function setAxiosDefaults() {
  axios.defaults.baseURL = serverUrl;
}

function setLocationMapDefaults() {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });
}
