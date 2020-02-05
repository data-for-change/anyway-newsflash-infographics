import React, { FunctionComponent } from 'react'

import { useStore } from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import { observer } from 'mobx-react-lite'

import AnyWayGrid from '../atoms/AnyWayGrid'
import AnyWayCard from '../molecules/AnyWayCard'
import PieChartView from '../molecules/PieChartView'
import BarChartView from '../molecules/BarChartView'
import LocationMap from '../molecules/LocationMap'

interface IProps {}

const WidgetsTemplate: FunctionComponent<IProps> = observer(() => {
    const store: RootStore = useStore()
    const widgetsData: any = store.newsFlashWidgetsData
    const widgets = widgetsData.map((widget: any) => {
        const name = widget.name
        const data = widget.data

        return (
            <AnyWayGrid>
                <AnyWayCard key={name}>
                    {name === 'most_severe_accidents' ? (
                        <LocationMap key={name} marker={{ lat: 32.0853, lng: 34.7818 }} />
                    ) : null}
                    {name === 'accident_count_by_severity' ? <div key={name}>Text</div> : null}
                    {name === 'accident_count_by_accident_type' ? (
                        <PieChartView key={name} data={data} />
                    ) : null}
                    {name === 'accident_count_by_accident_year' ? (
                        <BarChartView key={name} data={data} />
                    ) : null}
                </AnyWayCard>
            </AnyWayGrid>
        )
    })

    return widgets
})
export default WidgetsTemplate
