import {defaultWidgetsCollectionData, mockHTTPCall} from './mocks/mock.service';
import {IWidgetData} from '../models/WidgetData';

export function fetchDefaultWidgets(): Promise<Array<any>> {
  return mockHTTPCall<Array<IWidgetData>>(defaultWidgetsCollectionData) ;
}
