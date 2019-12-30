import {INewsFlash} from '../models/NewFlash';
import {mockHTTPCall, NewsFlashCollectionData} from './mocks/mock.service';

export function fetchNews(): Promise<Array<INewsFlash>> {
  return mockHTTPCall<Array<INewsFlash>>(NewsFlashCollectionData) ;
}
