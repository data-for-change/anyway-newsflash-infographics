import { getDemoWidgetData } from './mocks/mock.service';
import { ILocationData, IWidgetBase } from '../models/WidgetData';
import axios from 'axios';
import { DEMO_ID, showDemoCards, showOnlyOperCards } from '../utils/utils';
import { operationalCards } from '../const/cards.const';

const NEWS_FLASH_API: string = '/api/infographics-data';

export const fetchWidgets = async (id: number, lang: string, yearAgo?: number): Promise<ILocationData | undefined> => {
  if (showDemoCards && id === DEMO_ID) {
    return getDemoWidgetData();
  }

  try {
    const query = [`lang=${lang}&news_flash_id=${id}`];
    if (yearAgo) {
      query.push(`years_ago=${yearAgo}`);
    }
  const widgetsUrl = `${NEWS_FLASH_API}?${query.join('&')}${
      process.env.REACT_APP_SHOW_MOCK_INFORMATION && `&mock=${process.env.REACT_APP_SHOW_MOCK_INFORMATION}`
    }`;    //temp - long response time of server- keep console.log to see out url
    console.log(widgetsUrl);
    const response = await axios.get(widgetsUrl);
    return processWidgetsFetchResponse(response);
  } catch (error) {
    console.log(error);
  }
};

function processWidgetsFetchResponse(response: any) {
  const meta = response.data.meta;
  let widgets = response.data.widgets;
  widgets = getVerifiedWidgetsData(widgets);
  widgets = addWidgetsVariants(widgets);

  if (showOnlyOperCards) {
    widgets = getOperWidgetData(widgets);
  }
  return { meta, widgets };
}

function getOperWidgetData(widgets: Array<any>) {
  return widgets.filter((widget) => operationalCards.includes(widget.name));
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
