import React, { FunctionComponent } from 'react'

import { useStore } from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import { observer } from 'mobx-react-lite'

import AnyWayGrid from '../atoms/AnyWayGrid'
import AnyWayCard from '../molecules/AnyWayCard'
import PieChartView from '../molecules/PieChartView'
import BarChartView from '../molecules/BarChartView'
import LocationMap from '../molecules/LocationMap'

import { pieChartDataType } from '../molecules/PieChartView'
import { barChartDataType } from '../molecules/BarChartView'
import { IWidgetData } from '../../models/WidgetData'

interface IProps {}

const WidgetsTemplate: FunctionComponent<IProps> = observer((...props: any) => {
    const { pieChartData, barChartData } = props[0]
    return (
        <AnyWayGrid>
            <AnyWayCard>
                <h5>HeatMapWidget</h5>
                <p>HeatMapWidget(template) is an aware widget - it can fetch data from the store</p>
                <p>HeatMapWidget contain an un-aware component called HeatMapView(molecule) </p>
            </AnyWayCard>
            <AnyWayCard>
                <p>Some Text</p>
                <PieChartView data={pieChartData} />
            </AnyWayCard>
            <AnyWayCard>
                <h5>PieChartWidget</h5>
                <p>
                    PieChartWidget(template) is an aware widget - it can fetch data from the store
                </p>
                <p>PieChartWidget contain an un-aware component called PieChartView(molecule) </p>
            </AnyWayCard>
            <AnyWayCard>
                <p>Some Text</p>
                <BarChartView data={barChartData} />
            </AnyWayCard>
            <AnyWayCard>
                <LocationMap marker={{ lat: 32.0853, lng: 34.7818 }} />
            </AnyWayCard>
            <AnyWayCard>
                <p>Some Text</p>
                <BarChartView data={barChartData} />
            </AnyWayCard>
        </AnyWayGrid>
    )
})
const WidgetsTemplateStore: FunctionComponent<IProps> = observer(() => {
    const store: RootStore = useStore()
    const widgetsData: IWidgetData[] = store.widgets
    const pieChartData: pieChartDataType[] = []
    const barChartData: barChartDataType[] = []
    widgetsData.forEach((widget: any) => {
        pieChartData.push({ x: widget.quarter, y: widget.earnings })
        barChartData.push({ x: widget.quarter, y: widget.earnings })
    })
    const props: any = { pieChartData, barChartData }
    return <WidgetsTemplate {...props} />
})
export default WidgetsTemplateStore
