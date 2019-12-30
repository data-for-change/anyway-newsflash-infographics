import React from 'react'
import { VictoryPie, VictoryContainer } from 'victory'

interface Idata {
    quarter?: string,
    earnings?: number,
    x?: number,
    y?: number
}
const pieChartViewStyle = {
    labels: {
        fontSize: 8, fill: "black"
    }
}

export const PieChartView = () => {
    const data: Idata[] = [
        { quarter: 'Car', earnings: 13000 },
        { quarter: 'Pedestrian', earnings: 16500 },
        { quarter: 'Cyclist', earnings: 14250 },
        { quarter: 'Public Transport', earnings: 19000 },
        { quarter: 'Train', earnings: 19000 },
        { quarter: 'Light Train', earnings: 19000 }
    ]
    return (
        <VictoryPie
            data={data}
            x='quarter' y='earnings'
            style={pieChartViewStyle}
            labelRadius={60}
            innerRadius={20}
            padding={50}
            width={200} height={200}
            colorScale="red"
            containerComponent={<VictoryContainer responsive={true} />}
        />
    )

}