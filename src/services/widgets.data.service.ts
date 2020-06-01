import { defaultWidgetsCollectionData, mockHTTPCall } from './mocks/mock.service';
import { ILocationData } from '../models/WidgetData';
import axios from 'axios';

export function fetchDefaultWidgets(): Promise<any> {
  // @ts-ignore
  return mockHTTPCall<ILocationData>(defaultWidgetsCollectionData);
}

const NEWS_FLASH_API: string = '/api/infographics-data';

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
  const verifiedWidgets = widgets.filter((widget, index) => {
    // general structure tests (for all widgets)
    // test name property
    let isValid = widget && widget.name && typeof widget.name === 'string';
    // test data and data.items property
    isValid = isValid && widget.data && widget.data.items
    if(Array.isArray(widget.data.items)) {
      isValid = isValid && widget.data.items.length > 0;
    } else {
      isValid = isValid && typeof widget.data.items === 'object'
    }
    }
    // TODO
    // add checks per widget (switch) here


    if(!isValid) {
      console.warn(`Invalid widget ${widget.name} [index: ${index}]: `, widget);
    }
    return isValid;
  });
  return verifiedWidgets;
}
