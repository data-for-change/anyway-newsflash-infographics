import {INewsFlash} from '../models/NewFlash';
import {mockHTTPCall, newsFlashCollectionData} from './mocks/mock.service';

export function fetchNews(): Promise<Array<any>> {
  return mockHTTPCall<Array<INewsFlash>>(newsFlashCollectionData) ;
}
