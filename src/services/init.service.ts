import axios from 'axios';
import { fetchNews } from './news.data.service';
import { fetchDefaultWidgets } from './widgets.data.service';
import L from 'leaflet';
import {serverUrl} from "../utils/utils";

export function initService(): Promise<any> {
  setAxiosDefaults();
  setLocationMapDefaults();

  const promiseArray = [
    fetchNews('', 10),
    fetchDefaultWidgets(),
    /* add promises here */
  ];

  return Promise.all(promiseArray).then((promiseCollection) => ({
    // return object - resolved data from all promises
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
