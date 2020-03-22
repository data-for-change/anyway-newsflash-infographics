import React, {useEffect,FunctionComponent} from 'react'

import {useStore} from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import {observer} from 'mobx-react-lite'
import {Grid} from '../atoms'
import AnyWayCard from '../molecules/AnyWayCard'
import CountByYearBarWidget from '../molecules/CountByYearBarWidget'
import CountByTypePieWidget from '../molecules/CountByTypePieWidget'
import CountBySeverityPieWidget from '../molecules/CountBySeverityPieWidget'
import HeatMap from '../molecules/HeatMap'

interface IProps {
  id: number;
}

const getWidgetByType = (widget: any) => {
  switch (widget.name) {
    case 'most_severe_accidents': {
      return (
        <div>Place holder for most severe accidents Widget</div>
      )
    }
    case 'most_severe_accidents_heatmap': {
      return (
        <HeatMap
          key={widget.name}
          data={widget.data}
          marker={{lat: 32.0853, lng: 34.7818}}
        />
      )
    }
    case 'accident_count_by_severity': {
      return <CountBySeverityPieWidget data={widget.data}/>
    }
    case 'accident_count_by_accident_type': {
      return <CountByTypePieWidget data={widget.data}/>
    }
    case 'accident_count_by_accident_year': {
      return <CountByYearBarWidget data={widget.data}/>
    }
    default:
      return null
  }
};

const WidgetsTemplate: FunctionComponent<IProps> = ({id}) => {
  const store: RootStore = useStore();
  useEffect(()=>{
    store.selectNewsFlash(id);
  },[id])
  const widgetsData = store.newsFlashWidgetsData;

  return (
    <Grid.Container>
      {widgetsData.map((widget, index) => (
        <AnyWayCard key={index}>{getWidgetByType(widget)}</AnyWayCard>
      ))}
    </Grid.Container>
  )
};

export default observer(WidgetsTemplate)
