import { Box } from '@mui/material';
import { Grid, MetaTag, Typography } from 'components/atoms';
import ErrorBoundary from 'components/atoms/ErrorBoundary';
import AnyWayCard from 'components/molecules/card/AnyWayCard';
import WidgetWrapper from 'components/molecules/widgets/WidgetWrapper';
import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';

const WidgetsTemplate: FC = () => {
  const store: RootStore = useStore();
  const { t } = useTranslation();
  const widgetsData = store.newsFlashWidgetsData;
  const widgetCards = widgetsData.map((widget, index, sizeOptions) => {
    const widgetComponent = (
      <WidgetWrapper
        widget={widget}
        locationText={store.newsFlashWidgetsMetaLocation}
        segmentText={store.newsFlashWidgetsMetaSegmentName}
        sizeOptions={sizeOptions}
      />
    );
    if (!widgetComponent) {
      return null;
    }
    return (
      <Box m={2} key={index}>
        <AnyWayCard
          information={widget.meta.information}
          widgetName={widget.name}
          title={widget.data?.text?.title}
          dateComment={store.newsFlashWidgetsMetaDateComment}
          roadNumber={store.newsFlashWidgetsMetaRoadNumber}
        >
          <MetaTag>{widget.name}</MetaTag>
          <ErrorBoundary>{widgetComponent}</ErrorBoundary>
        </AnyWayCard>
      </Box>
    );
  });

  const NoDataText = <Typography.Body4>{t('widgets.No data')}</Typography.Body4>;

  return <Grid.Container>{widgetsData && widgetsData.length > 0 ? widgetCards : NoDataText} </Grid.Container>;
};

export default observer(WidgetsTemplate);
