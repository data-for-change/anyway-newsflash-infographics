import React, { FC, useEffect } from 'react';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { observer } from 'mobx-react-lite';
import { Grid } from '../atoms';
import AnyWayCard from '../molecules/card/AnyWayCard';
import ErrorBoundary from '../atoms/ErrorBoundary';
import { MetaTag } from '../atoms';
import { Text, TextType } from '../atoms';
import { Box } from '@material-ui/core';
import WidgetWrapper from '../molecules/widgets/WidgetWrapper';

interface IProps {
  id: number | null;
}

const WidgetsTemplate: FC<IProps> = ({ id }) => {
  const store: RootStore = useStore();

  useEffect(() => {
    if (id) {
      store.selectNewsFlash(id);
    }
  }, [id, store]);

  const widgetsData = store.newsFlashWidgetsData;
  const widgetCards = widgetsData.map((widget, index) => {
    const widgetComponent = <WidgetWrapper widget={widget} segmentText={store.newsFlashWidgetsMetaString} />;
    if (!widgetComponent) {
      return null;
    }
    return (
      <Box m={2} key={index}>
        <AnyWayCard widgetName={widget.name} roadNumber={store.newsFlashWidgetsMetaNumber}>
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
