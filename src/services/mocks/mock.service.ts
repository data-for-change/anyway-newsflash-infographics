import newsFlashCollectionData from './newsFlash.mock.data';
import defaultWidgetsCollectionData from './widgetsData.mock.data';

export {
  newsFlashCollectionData,
  defaultWidgetsCollectionData,
  // add more mock data here
};

export function mockHTTPCall<T>(mockData: T): Promise<T>{
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(mockData);
    }, 200);
  });
}
