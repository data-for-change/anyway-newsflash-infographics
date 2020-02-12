// https://mobx.js.org/best/store.html#combining-multiple-stores
import { action,observable } from 'mobx'
import { initService } from '../services/init.service'
import { fetchWidgets } from '../services/widgets.data.service'
import { INewsFlash } from '../models/NewFlash'
import { IWidgetData } from '../models/WidgetData'

export default class RootStore {
    [ key: string ]: any // Declaring an index signature

    appInitialized = false

    @observable newsFlashCollection: Array<INewsFlash> = []
    @observable newsFlashWidgetsData: IWidgetData = []
    @observable newsFlashWidgetsMetaData: any = {}

    constructor () {
        // init app data
        initService().then( initData => {
            console.log(initData);
            this.safeInitialization( 'newsFlashCollection', initData.newsFlashCollection );
            this.safeInitialization( 'newsFlashWidgetsData',initData.newsFlashWidgetsData.widgets );
            // console.log( this.newsFlashWidgetsData )
            // additional Initialization steps can be added here
            this.appInitialized = true
        } )
    }

    // prop is a property on RootStore to be initialized, like: this.suggestions
    safeInitialization ( prop: string,valueToCheck: any ) {
        if ( Array.isArray( valueToCheck ) ) {
            this[ prop ] = valueToCheck
        } else {
            console.warn( `Property [${ prop }] was not initialized. Invalid value (${ valueToCheck })` )
        }
    }

    @action
    selectNewsFlash (id: number ): void {
        console.log(id);
        fetchWidgets(id)
        .then((response:any)=> {
            if (response.widgets !== undefined) {
                this.safeInitialization( 'newsFlashWidgetsData',response.widgets )
            }
        })
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
