import {INewsFlash} from '../models/NewFlash';
import {mockHTTPCall, newsFlashCollectionData} from './mocks/mock.service';

export function fetchNews(): Promise<Array<INewsFlash>> {
  return mockHTTPCall<Array<INewsFlash>>(newsFlashCollectionData) ;
}
