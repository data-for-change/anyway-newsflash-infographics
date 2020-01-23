import React, { FunctionComponent } from 'react'
import { VictoryPie, VictoryContainer } from 'victory'

interface IProps {
    data: pieChartDataType[]
}
export type pieChartDataType = {
    x: string
    y: number
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
