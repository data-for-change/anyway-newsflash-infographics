import { showDemoCards } from '../../utils/utils';
import newsFlashCollectionData from './newsFlash.mock.data';
import defaultWidgetsCollectionData from './widgetsData.mock.data';
import demoCardsNewsFlash from './demoCardsNewsflash.mock.data';
import demoCardsWidgetsData from './demoCardsWidgetsData.mock.data';
import { ILocationData } from '../../models/WidgetData';

const demoNewsflashIndex = 2; // add demo newsflash in this index

export {
  newsFlashCollectionData,
  defaultWidgetsCollectionData,
  // add more mock data here
};

export function mockHTTPCall<T>(mockData: T): Promise<{ data: T }> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ data: mockData });
    }, 200);
  });
}

// add demoNewsflash to newsflash data
export function addDemoNewsflash(data: Array<any>) {
  data.splice(demoNewsflashIndex, 1, demoCardsNewsFlash);
  return data;
}

// add demo widget Data
export function getDemoWidgetData(): Promise<ILocationData> {
  return new Promise(function (resolve) {
    resolve(demoCardsWidgetsData);
  });
}
