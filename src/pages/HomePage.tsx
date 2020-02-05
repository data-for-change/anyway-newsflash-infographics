import React, { FunctionComponent } from 'react'
import Grid from '@material-ui/core/Grid'
import { AnyWayGrid } from '../components/atoms';
import AnyWayCard from '../components/molecules/AnyWayCard'
import PieChartView from '../components/molecules/PieChartView'
import BarChartView from '../components/molecules/BarChartView'
import LocationMap from '../components/molecules/LocationMap'
import HeatMap from '../components/molecules/HeatMap'

interface IProps { }

export const HomePage: FunctionComponent<IProps> = () => {
    return (
        <AnyWayGrid>
            <Grid item lg={4} xl={4}>
                <AnyWayCard>
                    <HeatMap marker={{ lat: 32.0853, lng: 34.7818 }} />
                </AnyWayCard>
            </Grid>
            <Grid item lg={4} xl={4}>
                <AnyWayCard>
                    <p>Some Text</p>
                    <PieChartView />
                </AnyWayCard>
            </Grid>
            <Grid item lg={4} xl={4}>
                <AnyWayCard>
                    <h5>PieChartWidget</h5>
                    <p>
                        PieChartWidget(template) is an aware widget - it can fetch data from the
                        store
                    </p>
                    <p>
                        PieChartWidget contain an un-aware component called PieChartView(molecule){' '}
                    </p>
                </AnyWayCard>
            </Grid>
            <Grid item lg={4} xl={4}>
                <AnyWayCard>
                    <p>Some Text</p>
                    <BarChartView />
                </AnyWayCard>
            </Grid>
            <Grid item lg={4} xl={4}>
                <AnyWayCard>
                    <LocationMap marker={{ lat: 32.0853, lng: 34.7818 }} />
                </AnyWayCard>
            </Grid>
            <Grid item lg={4} xl={4}>
                <AnyWayCard>
                    <p>Some Text</p>
                    <BarChartView />
                </AnyWayCard>
            </Grid>
        </AnyWayGrid>
    )
}
