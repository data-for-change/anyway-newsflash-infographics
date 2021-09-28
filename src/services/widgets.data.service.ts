import { getDemoWidgetData } from './mocks/mock.service';
import { ILocationData, IWidgetBase } from 'models/WidgetData';
import axios from 'axios';
import { DEMO_ID, showDemoCards, showOnlyOperCards, SHOW_MOCK } from 'utils/utils';
import { operationalCards } from 'const/cards.const';
import { getVerifiedWidgetsData } from './data.verification/data.verification.service';

const NEWS_FLASH_API: string = '/api/infographics-data';

export const fetchWidgets = async (id: number, lang: string, yearAgo?: number): Promise<ILocationData | undefined> => {
	if (showDemoCards && id === DEMO_ID) {
		return getDemoWidgetData();
	}

	try {
		const query = [
			`lang=${lang}&news_flash_id=${id}`
		];
		if (yearAgo) {
			query.push(`years_ago=${yearAgo}`);
		}
		if (SHOW_MOCK) {
			query.push(`mock=${SHOW_MOCK}`);
		}
  
		const widgetsUrl = `${NEWS_FLASH_API}?${query.join('&')}`;
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
