import React from 'react'
import { VictoryContainer, VictoryBar } from 'victory'

interface Idata {
    angle?: number,
    radius?: number,
    label?: string,
    subLabel?: string,
    fontSize?: number,
    style?: object
    quarter?: string,
    earnings?: number,
    x?: number,
    y?: number
}

export const BarChartView = () => {
    const data: Idata[] = [
        { quarter: 'Car', earnings: 13000 },
        { quarter: 'Pedestrian', earnings: 16500 },
        { quarter: 'Cyclist', earnings: 14250 },
        { quarter: 'Public Transport', earnings: 19000 },
        { quarter: 'Train', earnings: 19000 },
        { quarter: 'Light Train', earnings: 19000 }
    ]
    return (
        <React.Fragment>
            <VictoryBar
                data={data}
                x='quarter' y='earnings'
                style={{ data: { fill: "#c43a31" } }}
                barRatio={1}
                containerComponent={ <VictoryContainer responsive={true} /> }
            />
        </React.Fragment>
    )

}