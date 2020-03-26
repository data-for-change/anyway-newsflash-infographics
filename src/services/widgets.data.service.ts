import {defaultWidgetsCollectionData, mockHTTPCall} from './mocks/mock.service'
import {IWidgetData} from '../models/WidgetData';
import axios from 'axios'

export function fetchDefaultWidgets (): Promise<any> {
  return mockHTTPCall<IWidgetData>( defaultWidgetsCollectionData )
}


export const fetchWidgets = async (id:number): Promise<Array<any> | undefined> => {
  try {
    const widgetsUrl = `/api/infographics_data?news_flash_id=${id}&end_time=1579368824&start_time=1262304000`;
    //temp - long response time of server- keep console.log to see out url
    console.log(widgetsUrl);
    const response = await axios.get( widgetsUrl );
    return await response.data;
  } catch ( error ) {
    console.log( error )
  }
};
