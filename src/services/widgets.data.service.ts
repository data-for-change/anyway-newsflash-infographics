import { defaultWidgetsCollectionData,mockHTTPCall } from './mocks/mock.service'
import { IWidgetData } from '../models/WidgetData';
// import axios from 'axios'
export function fetchDefaultWidgets (): Promise<Array<any>> {
  return mockHTTPCall<IWidgetData>( defaultWidgetsCollectionData )
}
// const widgetsUrl = 'https://anyway.co.il/api/infographics_data?news_flash_id=14849&end_time=1579368824&start_time=1262304000'
// export const fetchWidgets = async (): Promise<Array<any> | undefined> => {
//   try {
//     const response = await axios.get( widgetsUrl )
//     const data = await response.data
//     return data
//   } catch ( error ) {
//     console.log( error )
//   }

// }