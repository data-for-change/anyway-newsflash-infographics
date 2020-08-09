import React, { FC, useEffect } from 'react';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { observer } from 'mobx-react-lite';
import { Grid } from '../atoms';
import AnyWayCard from '../molecules/AnyWayCard';
import ErrorBoundary from '../atoms/ErrorBoundary';
import { MetaTag } from '../atoms';
import { Text, TextType } from '../atoms';
import { Box } from '@material-ui/core';
import WidgetWrapper from '../molecules/widgets/WidgetWrapper';

interface IProps {
  id: number | null;
  filterValue: number | null;
}

const WidgetsTemplate: FC<IProps> = ({ id,filterValue }) => {
  const store: RootStore = useStore();

  useEffect(() => {
    if (id) {
      store.selectNewsFlash(id,filterValue);
    }
  }, [id, store,filterValue]);

  const widgetsData = store.newsFlashWidgetsData;
  const widgetCards = widgetsData.map((widget, index) => {
    const widgetComponent = (
      <WidgetWrapper
        widget={widget}
        segmentText={store.newsFlashWidgetsMetaString}
        roadNumber={store.newsFlashWidgetsMetaNumber}
      />
    );
    if (!widgetComponent) {
      return null;
    }
    return (
      <Box m={2} key={index}>
        <AnyWayCard widgetName={widget.name}>
          <MetaTag>{widget.name}</MetaTag>
          <ErrorBoundary>{widgetComponent}</ErrorBoundary>
        </AnyWayCard>
      </Box>
    );
  });

  const NoDataText = <Text type={TextType.CONTENT_TITLE}>אין נתונים להצגה</Text>;

  return <Grid.Container>{widgetsData && widgetsData.length > 0 ? widgetCards : NoDataText} </Grid.Container>;
};

export default observer(WidgetsTemplate);
