import NewsFlashCollectionData from './newsFlash.mock.data';

export {
  // ad more mock data
  NewsFlashCollectionData
};

export function mockHTTPCall<T>(mockData: T): Promise<T> {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(mockData);
    }, 200);
  });
}

