import {defaultWidgetsCollectionData, mockHTTPCall} from './mocks/mock.service'
import {IWidgetData} from '../models/WidgetData';
import axios from 'axios'

export function fetchDefaultWidgets (): Promise<any> {
  return mockHTTPCall<IWidgetData>( defaultWidgetsCollectionData )
}


const NEWS_FLASH_API: string = '/api/infographics_data';


export const fetchWidgets = async (id:number,  yearAgo?: number): Promise<Array<any> | undefined> => {
  try {
    const query = [`news_flash_id=${id}`];
    if(yearAgo) {
      query.push(`years_ago=${yearAgo}`);
    }
    const widgetsUrl = `${NEWS_FLASH_API}?${query.join('&')}`;
    //temp - long response time of server- keep console.log to see out url
    console.log(widgetsUrl);
    const response = await axios.get( widgetsUrl );
    return await response.data;
  } catch ( error ) {
    console.log( error )
  }
};
