import axios from 'axios';
import { INewsFlash } from 'models/NewFlash';
import { IGpsData, IStreetData } from "models/WidgetData";

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
};

const NEWS_FLASH_API: string = '/api/news-flash';
export interface IFetchNewsQueryParams {
  source?: string;
  offSet?: number;
  limit?: number;
  critical?: boolean | null;
};

export function fetchNews({source = '', offSet = 0, limit = 100, critical = null}: IFetchNewsQueryParams = {}): Promise<any> {
  const query = [];
  if (source) {
    query.push(`source=${source}`);
  }
  if (limit) {
    query.push(`limit=${limit}`);
  }
  if (critical !== null) {
    query.push(`critical=${critical}`);
  }
  query.push(`offset=${offSet}`);

  query.push('resolution=suburban_road');
  query.push('resolution=street');

  const url = `${NEWS_FLASH_API}?${query.join('&')}`;

  return (
    axios
      .get(url)
      .then((res) => res.data)
      .catch(onErrorFetchNewsFlash)
  );
}

function onErrorFetchNewsFlash() {
  const errorArr: Array<INewsFlash> = new Array<INewsFlash>();
  errorArr.push(errorNews);
  return errorArr;
}

export function updateNews(newsId: number, newLocationQualification: any,
                           streetLocation: IStreetData | null, gpsLocation: IGpsData | null) {
  const data : Record<string, string | undefined> = {}; // object to hold request data
  data['newsflash_location_qualification'] = newLocationQualification;

  if (gpsLocation) {
    data['road_segment_name'] = gpsLocation.road_segment_name;
    data['road1'] = gpsLocation.road1;
  } else if (streetLocation) {
    data['yishuv_name'] = streetLocation.city.yishuv_name;
    data['street1_hebrew'] = streetLocation.street.street_hebrew;
  }
  const url = `${NEWS_FLASH_API}/${newsId}`;
  axios
    .patch(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => res.data)
    .catch(onErrorFetchNewsFlash)
}
