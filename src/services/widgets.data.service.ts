import { ILocationData, IWidgetBase } from 'models/WidgetData';
import axios from 'axios';
import { showOnlyOperCards, SHOW_MOCK } from 'const/generalConst';
import { operationalCards } from 'const/cards.const';
import { getVerifiedWidgetsData } from './data.verification/data.verification.service';

const NEWS_FLASH_API: string = '/api/infographics-data';
const WIDGETS_BY_LOCATION_API: string = 'api/infographics-data-by-location';

export interface IWidgetInput {
  lang: string;
  newsId?: number;
  gpsId?: number;
  yearAgo?: number;
  city?: string;
  street?: string;
}

const getWidgetUrl = ({ lang, newsId, yearAgo, gpsId, city, street }: IWidgetInput): string => {
  const query = [];
  if (newsId) {
    query.push(`${NEWS_FLASH_API}?lang=${lang}&news_flash_id=${newsId}`);
  }
  if (gpsId) {
    query.push(`${WIDGETS_BY_LOCATION_API}?lang=${lang}&road_segment_id=${gpsId}`);
  }
  if (city && street) {
    query.push(`${NEWS_FLASH_API}?lang=${lang}&street1_hebrew=${street}&yishuv_name=${city}`);
  }
  if (yearAgo) {
    query.push(`years_ago=${yearAgo}`);
  }
  if (SHOW_MOCK) {
    query.push(`mock=${SHOW_MOCK}`);
  }

  return query.join('&');
};

export const fetchWidgets = async ({
  lang,
  newsId,
  yearAgo,
  gpsId,
  city,
  street,
}: IWidgetInput): Promise<ILocationData | undefined> => {
  try {
    const widgetsUrl = getWidgetUrl({ lang, newsId, yearAgo, gpsId, city, street });
    console.log(widgetsUrl);
    const response = await axios.get(widgetsUrl);
    return processWidgetsFetchResponse(response);
  } catch (error) {
    console.error(error);
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
