import React from 'react'
import WidgetsTemplateStore from '../components/templates/WidgetsTemplate'
import Grid from '@material-ui/core/Grid'
import {AnyWayGrid} from '../components/atoms';
import AnyWayCard from '../components/molecules/AnyWayCard'
import PieChartView from '../components/molecules/PieChartView'
import BarChartView from '../components/molecules/BarChartView'
import LocationMap from '../components/molecules/LocationMap'

interface IProps {}

export const HomePage: React.FC<IProps> = () => {
    return <WidgetsTemplateStore />
}
