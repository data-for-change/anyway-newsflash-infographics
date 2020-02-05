import React, { FunctionComponent } from 'react'
import { VictoryPie, VictoryContainer } from 'victory'

interface IProps {
    data: pieChartDataType[]
}
export type pieChartDataType = {
    accident_type: string
    count: number
}
export const PieChartView: FunctionComponent<IProps> = ({ data }) => {
    const pieChartViewStyle = {
        labels: {
            fontSize: 8,
            fill: 'black'
        }
    }
    return (
        <VictoryPie
            data={data}
            x='accident_type'
            y='count'
            style={pieChartViewStyle}
            labelRadius={60}
            innerRadius={20}
            padding={50}
            width={200}
            height={200}
            colorScale='red'
            containerComponent={<VictoryContainer responsive={true} />}
        />
    )
}
export default PieChartView
