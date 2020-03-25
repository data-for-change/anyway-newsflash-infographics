// https://mobx.js.org/best/store.html#combining-multiple-stores
import {action, observable} from 'mobx'
import {initService} from '../services/init.service'
import {fetchWidgets} from '../services/widgets.data.service'
import {INewsFlash} from '../models/NewFlash'
import {IWidgetData} from '../models/WidgetData'

export default class RootStore {
  [key: string]: any // Declaring an index signature

  appInitialized = false;

  @observable newsFlashCollection: Array<INewsFlash> = [];
  @observable newsFlashWidgetsData: Array<IWidgetData> = [];
  @observable newsFlashWidgetsMetaData: any = {};

  constructor() {
    // init app data
    initService().then(initData => {
      console.log(initData);
      this.safeSet('newsFlashCollection', initData.newsFlashCollection);
      this.safeSet('newsFlashWidgetsData', initData.newsFlashWidgetsData.widgets);
      this.appInitialized = true
    })
  }

  // prop is a property on RootStore to be initialized, like: this.suggestions
  safeSet(prop: string, valueToCheck: any) {
    if (valueToCheck && Array.isArray(valueToCheck)) {
      this[prop] = valueToCheck
    } else {
      console.warn(`Property [${prop}] was not initialized. Invalid value (${valueToCheck})`)
    }
  }

  @action
  selectNewsFlash(id: number): void {
    fetchWidgets(id)
      .then((response: any) => {
        if (response.widgets !== undefined) {
          this.safeSet('newsFlashWidgetsData', response.widgets)
        }
      })
  }
}
