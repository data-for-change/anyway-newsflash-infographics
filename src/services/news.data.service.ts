import axios from 'axios';
import { INewsFlash } from 'models/NewFlash';
import { IGpsData, IStreetData } from "models/WidgetData";
import {IPoint} from "../models/Point";

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
  newsflash_location_qualification : '',
  location: '',
  curr_cbs_location_text: '',
};

const NEWS_FLASH_API: string = '/api/news-flash';
export interface IFetchNewsQueryParams {
  source?: string;
  critical?: boolean | null;
  newsFlashId?: number;
  pageNumber?: number;
  pageSize?: number;
}

export function fetchNews({
  source = '',
  pageNumber,
  pageSize = 100,
  critical = null,
  newsFlashId,
}: IFetchNewsQueryParams): Promise<any> {
  const query = [];
  if (source) {
    query.push(`source=${source}`);
  }
  if (pageSize) {
    query.push(`pageSize=${pageSize}`);
  }
  if (critical !== null) {
    query.push(`critical=${critical}`);
  }
  if (newsFlashId) {
    query.push(`newsFlashId=${newsFlashId}`);
  }
  if (pageNumber) {
    query.push(`pageNumber=${pageNumber}`);
  }
  query.push('resolution=suburban_road');
  query.push('resolution=street');

  const url = `${NEWS_FLASH_API}?${query.join('&')}`;

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

interface IUpdateNews {
  newsId: number,
  newLocationQualification: any,
  streetLocation?: IStreetData,
  gpsLocation?: IGpsData,
  pointLocation?: IPoint,
}

export function updateNews({
  newsId,
  newLocationQualification,
  streetLocation,
  gpsLocation,
  pointLocation,
} : IUpdateNews) {
  const data = [];
  data.push(`newsflash_location_qualification=${newLocationQualification}`);
  if (pointLocation) {
    data.push(`lat=${pointLocation.latitude}`);
    data.push(`lng=${pointLocation.longitude}`);
  }
  if (gpsLocation) {
    data.push(`road_segment_id=${gpsLocation.road_segment_id}`);
    data.push(`road1=${gpsLocation.road1}`);
  } else if (streetLocation) {
    data.push(`yishuv_name=${streetLocation.city.yishuv_name}`);
    data.push(`street1_hebrew=${streetLocation.street.street_hebrew}`);
  }
  const url = `${NEWS_FLASH_API}/${newsId}?${data.join('&')}`;
  axios
    .patch(url, {}, { withCredentials: true })
    .then((res) => res.data)
    .catch(onErrorFetchNewsFlash)
}
