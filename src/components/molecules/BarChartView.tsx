import React, { FunctionComponent } from 'react'
import { VictoryContainer, VictoryBar, VictoryChart, VictoryLabel } from 'victory'

interface IProps {
    data: barChartDataType[]
}
export type barChartDataType = {
    x: string
    y: number
}
const BarChartView: FunctionComponent<IProps> = ({ data }) => {
    const barChartViewStyle = { data: { fill: '#c43a31' } }

    return (
        <VictoryChart domain={{ x: [0.5, 5], y: [10000, 20000] }}>
            <VictoryBar
                data={data}
                style={barChartViewStyle}
                barRatio={1}
                containerComponent={<VictoryContainer responsive={true} />}
                labelComponent={<VictoryLabel textAnchor='start' />}
                alignment='start'
            />
        </VictoryChart>
    )
}
export default BarChartView
