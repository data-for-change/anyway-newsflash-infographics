import demoCardsWidgetsData from './demoCardsWidgetsData.mock.data';
import { ILocationData } from 'models/WidgetData';
const demoNewsflashIndex = 2; // add demo newsflash in this index

export function mockHTTPCall<T>(mockData: T): Promise<{ data: T }> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ data: mockData });
    }, 200);
  });
}
// add demo widget Data
export function getDemoWidgetData(): Promise<ILocationData> {
  return new Promise(function (resolve) {
    resolve(demoCardsWidgetsData);
  });
}
