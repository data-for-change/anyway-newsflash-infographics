import {INewFlash} from '../models/NewFlash';
import {mockHTTPCall, NewsFlashCollectionData} from './mocks/mock.service';

export function fetchNews(): Promise<Array<INewFlash>> {
  return mockHTTPCall<Array<INewFlash>>(NewsFlashCollectionData) ;
}
