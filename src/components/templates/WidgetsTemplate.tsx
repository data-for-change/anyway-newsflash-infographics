import React, { useEffect } from 'react';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { observer } from 'mobx-react-lite';
import { Grid } from '../atoms';
import AnyWayCard from '../molecules/AnyWayCard';
import CountByYearBarWidget from '../molecules/CountByYearBarWidget';
import CountByTypePieWidget from '../molecules/CountByTypePieWidget';
import CountInjuredByYearBarWidget from '../molecules/CountInjuredByYearBarWidget';
import CountBySeverityTextWidget from '../molecules/CountBySeverityTextWidget';
import CountAccidentsByDayNightPieWidget from '../molecules/CountAccidentsByDayNightPieWidget';
import StreetViewWidget from '../molecules/StreetViewWidget';
import MostSevereAccidentsMapWidget from '../molecules/MostSevereAccidentsMapWidget';
import HeatMap from '../molecules/HeatMap';
import ErrorBoundary from '../atoms/ErrorBoundary';
import { uniquePoints } from '../../utils/utils';

interface IProps {
  id: number | null;
}

const getWidgetByType = (widget: any) => {
  let widgetComponent;
  switch (widget.name) {
    case 'most_severe_accidents': {
      widgetComponent = <MostSevereAccidentsMapWidget data={widget.data}  />;
      break;
    }
    case 'accidents_heat_map': {
      const data = uniquePoints(widget.data);
      if (data.length <= 1) {
        return null;
      }
      widgetComponent = <HeatMap data={widget.data} center={{ lat: 32.0853, lng: 34.7818 }} />;
      break;
    }
    case 'street_view': {
      widgetComponent = <StreetViewWidget data={widget.data} />;
      break;
    }
    case 'accident_count_by_severity': {
      //widget wait for data changes from server
      widgetComponent = <CountBySeverityTextWidget data={widget.data} />;
      break;
    }
    case 'accident_count_by_accident_type': {
      // example of pie widget
      widgetComponent = <CountByTypePieWidget data={widget.data} />;
      break;
    }
    case 'accident_count_by_accident_year': {
      widgetComponent = <CountByYearBarWidget data={widget.data} />;
      break;
    }
    case 'injured_count_by_accident_year': {
      widgetComponent = <CountInjuredByYearBarWidget data={widget.data} />;
      break;
    }
    case 'accident_count_by_day_night': {
      widgetComponent = <CountAccidentsByDayNightPieWidget data={widget.data} />;
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

const WidgetsTemplate: React.FC<IProps> = ({ id }) => {
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
        <ErrorBoundary>{widgetComponent}</ErrorBoundary>
      </AnyWayCard>
    );
  });

  return <Grid.Container>{widgetCards}</Grid.Container>;
};

export default observer(WidgetsTemplate);
