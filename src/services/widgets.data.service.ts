import { defaultWidgetsCollectionData, mockHTTPCall } from './mocks/mock.service';
import { ILocationData, IWidgetBase } from '../models/WidgetData';
import axios from 'axios';

export function fetchDefaultWidgets(): Promise<any> {
  // @ts-ignore
  return mockHTTPCall<ILocationData>(defaultWidgetsCollectionData).then((res: any) => processWidgetsFetchResponse(res));
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
    return processWidgetsFetchResponse(response);
  } catch (error) {
    console.log(error);
  }
};

function processWidgetsFetchResponse(response: any) {
  console.log(response);
  const result = {
    meta: response.meta,
    widgets: getVerifiedWidgetsData(response.widgets),
  };
  result.widgets = addWidgetsVariants(result.widgets);
  return result;
}

// return array of valid widgets data (invalid widget objects will be removed!)
function getVerifiedWidgetsData(widgets: Array<any>) {
  const verifiedWidgets = widgets.filter((widget, index) => {
    // general structure tests (for all widgets)
    // test name property
    let isValid = widget && widget.name && typeof widget.name === 'string';
    // test data property
    isValid = isValid && widget.data;
    if (Array.isArray(widget.data)) {
      isValid = isValid && widget.data.length > 0;
    } else {
      isValid = isValid && typeof widget.data === 'object';
    }
    // TODO
    // add checks per widget (switch) here
    if (!isValid) {
      console.warn(`Invalid widget ${widget.name} [index: ${index}]: `, widget);
    }
    return isValid;
  });
  return verifiedWidgets;
}

// for future use
function addWidgetsVariants(widgets: Array<IWidgetBase>) {
  const index = widgets.findIndex((w) => w.name === 'head_on_collisions_comparison');
  if (index >= 0) {
    // create variant
    const widget = widgets[index];
    const widgetVariant = { ...widget };
    widgetVariant.name = widget.name + '_percentage';
    // add variant after original widget
    widgets.splice(index, 0, widgetVariant);
  }
  return widgets;
}
