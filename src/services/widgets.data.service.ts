import { defaultWidgetsCollectionData, mockHTTPCall } from './mocks/mock.service';
import { ILocationData } from '../models/WidgetData';
import axios from 'axios';

export function fetchDefaultWidgets(): Promise<any> {
  return mockHTTPCall<ILocationData>(defaultWidgetsCollectionData);
}

const NEWS_FLASH_API: string = '/api/infographics_data';

export const fetchWidgets = async (id: number, yearAgo?: number): Promise<any | undefined> => {
  try {
    const query = [`news_flash_id=${id}`];
    if (yearAgo) {
      query.push(`years_ago=${yearAgo}`);
    }
    const widgetsUrl = `${NEWS_FLASH_API}?${query.join('&')}`;
    //temp - long response time of server- keep console.log to see out url
    console.log(widgetsUrl);
    const response = await axios.get(widgetsUrl);
    const verifiedData = {
      meta: response.data.meta,
      widgets: getVerifiedWidgetsData(response.data.widgets),
    }
    return verifiedData;
  } catch (error) {
    console.log(error);
  }
};

// return array of valid widgets data (invalid widget objects will be removed!)
function getVerifiedWidgetsData(widgets: Array<any>) {
  const verifiedWidgets = widgets.filter((widget) => {
    let isValid = true;
    // add checks per widget (switch) here
    // in case of invalid widget: (1) set isValid to false (2) display warning to console
    return isValid;
  });
  return verifiedWidgets;
}
