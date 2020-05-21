import React, { FC, useEffect } from 'react';
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
import StaticImageViewWidget from '../molecules/StaticImageViewWidget';
import MostSevereAccidentsMapWidget from '../molecules/MostSevereAccidentsMapWidget';
import MostSevereAccidentsTableWidget from '../molecules/MostSevereAccidentsTableWidget';
import FatalAccidentsSegmentationPieWidget from '../molecules/FatalAccidentsSegmentationPieWidget';
import HeatMap from '../molecules/HeatMap';
import ErrorBoundary from '../atoms/ErrorBoundary';
import { MetaTag } from '../atoms';
import {Text, TextType} from '../atoms'
import { Box } from '@material-ui/core';

interface IProps {
  id: number | null;
}

const getWidgetByType = (widget: any) => {
  const { name, data } = widget;
  let widgetComponent;
  switch (name) {
    case 'most_severe_accidents': {
      widgetComponent = <MostSevereAccidentsMapWidget data={data} />;
      break;
    }
    case 'most_severe_accidents_table': {
      widgetComponent = <MostSevereAccidentsTableWidget data={data} />;
      break;
    }
    case 'accidents_heat_map': {
      widgetComponent = <HeatMap data={data.items} center={{ lat: 32.0853, lng: 34.7818 }} />;
      break;
    }
    case 'street_view': {
      widgetComponent = <StreetViewWidget data={data} />;
      break;
    }
    case 'accident_count_by_severity': {
      //widget wait for data changes from server
      widgetComponent = <CountBySeverityTextWidget data={data} />;
      break;
    }
    case 'accident_count_by_accident_type': {
      // example of pie widget
      widgetComponent = <CountByTypePieWidget data={data} />;
      break;
    }
    case 'accident_count_by_accident_year': {
      widgetComponent = <CountByYearBarWidget data={data} />;
      break;
    }
    case 'injured_count_by_accident_year': {
      widgetComponent = <CountInjuredByYearBarWidget data={data} />;
      break;
    }
    case 'accident_count_by_day_night': {
      widgetComponent = <CountAccidentsByDayNightPieWidget data={data} />;
      break;
	}
    case 'fatal_accidents_by_type': {
      widgetComponent = <FatalAccidentsSegmentationPieWidget data={data} />;
      break;
	}
	case 'vision_zero': {
		widgetComponent = <StaticImageViewWidget data={data} />;
		break;
	}
    default: {
      widgetComponent = null; // do not create element for unrecognized widget
      console.warn(`widget name (${name}) was not recognize `, widget);
      break;
    }
  }
  return widgetComponent;
};

const WidgetsTemplate: FC<IProps> = ({ id }) => {
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
      <Box m={2}>
        <AnyWayCard key={index} widgetName={widget.name}>
          <MetaTag>{widget.name}</MetaTag>
          <ErrorBoundary>{widgetComponent}</ErrorBoundary>
        </AnyWayCard>
      </Box>
    );
  });

 const NoDataText = <Text type={TextType.CONTENT_TITLE}>אין נתונים להצגה</Text>

 return  <Grid.Container>{widgetsData && widgetsData.length > 0 ? widgetCards: NoDataText} </Grid.Container>
};

export default observer(WidgetsTemplate);
