import React,{ FunctionComponent } from 'react'

import { useStore } from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import { observer } from 'mobx-react-lite'

import AnyWayGrid from '../atoms/AnyWayGrid'
import AnyWayCard from '../molecules/AnyWayCard'
import PieChartView from '../molecules/PieChartView'
import BarChartView from '../molecules/BarChartView'
import LocationMap from '../molecules/LocationMap'

interface IProps { }

const WidgetsTemplate: FunctionComponent<IProps> = ( ...widgetsData: any ) => {

    const widgets = Object.entries( widgetsData[ 0 ] ).map( ( widget: any ) => {
        const name = Object.entries( widget[ 1 ] )[ 0 ][ 1 ]
        const data = Object.entries( widget[ 1 ] )[ 1 ][ 1 ]
        const meta = Object.entries( widget[ 1 ] )[ 2 ][ 1 ]
        return [ name,data,meta ]
    } )
    return (
        <AnyWayGrid>
            { widgets.map( ( widget: any ) => {
                const [ name,data ] = widget
                return (
                    <>
                        <AnyWayCard key={ name }>
                            { name === 'most_severe_accidents' ? ( <LocationMap key={ name } marker={ { lat: 32.0853,lng: 34.7818 } } /> ) : null }
                            { name === 'accident_count_by_severity' ? ( <div key={ name }>Text</div> ) : null }
                            { name === 'accident_count_by_accident_type' ? ( <PieChartView key={ name } data={ data } /> ) : null }
                            { name === 'accident_count_by_accident_year' ? ( <BarChartView key={ name } data={ data } /> ) : null }
                        </AnyWayCard>
                    </>
                )
            } ) }
        </AnyWayGrid>
    )
}
const WidgetsTemplateStore: FunctionComponent<IProps> = observer( () => {
    const store: RootStore = useStore()
    const widgetsData: any = store.newsFlashWidgetsData
    return <WidgetsTemplate { ...widgetsData } />
} )
export default WidgetsTemplateStore
