import React, { FunctionComponent } from 'react'

import { useStore } from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import { observer } from 'mobx-react-lite'

import AnyWayGrid from '../atoms/AnyWayGrid'
import AnyWayCard from '../molecules/AnyWayCard'
import PieChartView from '../molecules/PieChartView'
import BarChartView from '../molecules/BarChartView'
import LocationMap from '../molecules/LocationMap'
import HeatMap from '../molecules/HeatMap'

interface IProps {}

const WidgetsTemplate: FunctionComponent<IProps> = observer(() => {
    const store: RootStore = useStore()
    const widgetsData: any = store.newsFlashWidgetsData
    const widgets = widgetsData.map((widget: any) => {
        return (
            <AnyWayGrid>
                <AnyWayCard key={widget.name}>
                    {/* {widget.name === 'most_severe_accidents' ? (
                        <LocationMap key={widget.name} marker={{ lat: 32.0853, lng: 34.7818 }} />
                    ) : null} */}
                    {widget.name === 'most_severe_accidents' ? (
                        <HeatMap key={widget.name} data={widget.data} marker={{ lat: 32.0853, lng: 34.7818 }} />
                    ) : null}
                    {widget.name === 'accident_count_by_severity' ? (
                        <div key={widget.name}>Text</div>
                    ) : null}
                    {widget.name === 'accident_count_by_accident_type' ? (
                        <PieChartView key={widget.name} data={widget.data} />
                    ) : null}
                    {widget.name === 'accident_count_by_accident_year' ? (
                        <BarChartView key={widget.name} data={widget.data} />
                    ) : null}
                </AnyWayCard>
            </AnyWayGrid>
        )
    })

    return widgets
})
export default WidgetsTemplate
