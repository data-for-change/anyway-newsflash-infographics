import React from 'react'
import { VictoryPie, VictoryContainer } from 'victory'

interface Idata {
    angle?: number,
    radius?: number,
    label?: string,
    subLabel?: string,
    fontSize?: number,
    style?: object
    quarter?: number,
    earnings?: number,
    x?: number,
    y?: number
}

export const PieChartView = () => {
    const data: Idata[] = [
        { quarter: 1, earnings: 13000 },
        { quarter: 2, earnings: 16500 },
        { quarter: 3, earnings: 14250 },
        { quarter: 4, earnings: 19000 }
    ]
    const data1: Idata[] = [
        { x: 1, y: 5 },
        { x: 2, y: 4 },
        { x: 3, y: 2 },
        { x: 4, y: 3 },
        { x: 5, y: 1 }
      ]

    return (
        <React.Fragment>
            <VictoryPie data={data} x='quarter' y='earnings' 
                        containerComponent={<VictoryContainer responsive={true}/>} 
            />
        </React.Fragment>
    )

}