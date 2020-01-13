import React from 'react'
import { VictoryContainer, VictoryBar } from 'victory'

interface Idata {
    quarter?: string
    earnings?: number
    x?: number
    y?: number
}
const barChartViewStyle = { data: { fill: '#c43a31' } }

const BarChartView = () => {
    const data: Idata[] = [
        { quarter: 'Car', earnings: 13000 },
        { quarter: 'Pedestrian', earnings: 16500 },
        { quarter: 'Cyclist', earnings: 14250 },
        { quarter: 'Public Transport', earnings: 19000 },
        { quarter: 'Train', earnings: 19000 },
        { quarter: 'Light Train', earnings: 19000 }
    ]
    return (
        <VictoryBar
            data={data}
            x='quarter'
            y='earnings'
            style={barChartViewStyle}
            barRatio={1}
            containerComponent={<VictoryContainer responsive={true} />}
        />
    )
}
export default BarChartView
