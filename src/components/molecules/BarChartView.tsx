import React, { FunctionComponent } from 'react'
import { VictoryContainer, VictoryBar, VictoryChart, VictoryLabel } from 'victory'

interface IProps {
    data: barChartDataType[]
}
export type barChartDataType = {
    accident_year: number
    count: number
}
const BarChartView: FunctionComponent<IProps> = ({ data }) => {
    const barChartViewStyle = { data: { fill: '#c43a31' } }

    return (
        <VictoryChart>
            <VictoryBar
                data={data}
                x='accident_year'
                y='count'
                style={barChartViewStyle}
                barRatio={1}
                containerComponent={<VictoryContainer responsive={true} />}
                labelComponent={<VictoryLabel textAnchor='start' />}
                // labelComponent={ <VictoryLabel dy={ 30 } /> }
                alignment='start'
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
            />
        </VictoryChart>
    )
}
export default BarChartView
