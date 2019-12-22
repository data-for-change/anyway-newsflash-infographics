// https://mobx.js.org/best/store.html#combining-multiple-stores
import {action, observable} from 'mobx';

export default class RootStore {
  @observable graphsData: any = {};
  
  @action
  selectNewsFlash(id: number): void {
    // steps:
    // 1 - get data from data.service
    // 2 - save data to graphsData
    // on main content Component  - use useObserver on return, example
    //
    // import {useObserver} from 'mobx-react-lite';
    //
    // return useObserver(() => (
    //     <div>Some content with {graphsData}</div>
    // );
    
  }
}


