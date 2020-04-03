import React, {FunctionComponent, useEffect} from 'react'

import {useStore} from '../../store/storeConfig'
import RootStore from '../../store/root.store'
import {observer} from 'mobx-react-lite'
import {Grid} from '../atoms'
import AnyWayCard from '../molecules/AnyWayCard'
import CountByYearBarWidget from '../molecules/CountByYearBarWidget'
import CountByTypePieWidget from '../molecules/CountByTypePieWidget'
import CountBySeverityPieWidget from '../molecules/CountBySeverityPieWidget'
import LocationMap from '../molecules/LocationMap'
import ErrorBoundary from '../atoms/ErrorBoundary';

interface IProps {
  id: number | null;
}

const getWidgetByType = (widget: any) => {
  let widgetComponent;

  switch (widget.name) {
    case 'most_severe_accidents': {
      widgetComponent = <LocationMap data={widget.data} center={{lat: 32.0853, lng: 34.7818}}/>;
      break;
    }
    case 'accidents_heat_map': {
      // widgetComponent = <HeatMap data={widget.data} marker={{lat: 32.0853, lng: 34.7818}}/>;
      widgetComponent = <div>HeatMap under construction</div>;
      break;
    }
    case 'accident_count_by_severity': {
      widgetComponent = <CountBySeverityPieWidget data={widget.data}/>;
      break;
    }
    case 'accident_count_by_accident_type': {
      widgetComponent = <CountByTypePieWidget data={widget.data}/>;
      break;
    }
    case 'accident_count_by_accident_year': {
      widgetComponent = <CountByYearBarWidget data={widget.data}/>;
      break;
    }
    default: {
      widgetComponent = null; // do not create element for unrecognized widget
      console.warn(`widget name (${widget.name}) was not recognize `, widget);
      break;
    }
  }
  return widgetComponent;
};

const WidgetsTemplate: FunctionComponent<IProps> = ({id}) => {
  const store: RootStore = useStore();
  useEffect(() => {
    if (id) {
      store.selectNewsFlash(id);
    }
  }, [id, store]);

  const widgetsData = store.newsFlashWidgetsData;

  const widgetCards = widgetsData.map((widget, index) => {
      const widgetComponent = getWidgetByType(widget);
      if (!widgetComponent) {
        return null;
      }
      return (
        <AnyWayCard key={index}>
          <ErrorBoundary>
            {widgetComponent}
          </ErrorBoundary>
        </AnyWayCard>
      )
    }
  );

  return (
    <Grid.Container>
      {widgetCards}
    </Grid.Container>
  )
};

export default observer(WidgetsTemplate)
