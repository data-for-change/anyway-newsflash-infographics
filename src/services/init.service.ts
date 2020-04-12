import axios from 'axios';
import { fetchNews } from './news.data.service';
import { fetchDefaultWidgets } from './widgets.data.service';
import L from 'leaflet'

export function initService(): Promise<any> {
  setAxiosDefaults();
  setLocationMapDefaults();

  const promiseArray = [
    fetchNews('', 10),
    fetchDefaultWidgets()
    /* add promises here */
  ];

  return Promise.all(promiseArray)
    .then((promiseCollection) => ({
      // return object - resolved data from all promises
      newsFlashCollection: promiseCollection[0],
      newsFlashWidgetsData: promiseCollection[1],
    }))
}

function setAxiosDefaults() {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  // todo: add error logger
  // axios.interceptors.response.use(
  //   response => response,
  //   (err: Error) => apiErrorHandler(err)
  // );

  // Add a cache request interceptor - should be used for dev / demo only
  if (process.env.REACT_APP_USE_LOCAL_PROXY) {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

    axios.interceptors.request.use(function (config) {
      if (config.baseURL) {
        const url = config.baseURL.replace('://', '/') + config.url;
        config.url = `http://localhost:9090/${url}`;
        console.log(`Request with cache: ${url}`);
      }
      return config;
    });
  }
}

function setLocationMapDefaults() {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });
}
