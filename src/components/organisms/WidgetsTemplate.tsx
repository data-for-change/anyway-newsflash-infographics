import React, { FC } from 'react';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import { observer } from 'mobx-react-lite';
import { Grid } from 'components/atoms';
import AnyWayCard from 'components/molecules/card/AnyWayCard';
import ErrorBoundary from 'components/atoms/ErrorBoundary';
import { MetaTag } from 'components/atoms';
import { Typography } from 'components/atoms';
import { Box } from '@material-ui/core';
import WidgetWrapper from 'components/molecules/widgets/WidgetWrapper';
import { useTranslation } from 'react-i18next';

const WidgetsTemplate: FC = () => {
  const store: RootStore = useStore();
  const { t } = useTranslation();
  const { widgetsStore } = store;
  const widgetsData = widgetsStore.newsFlashWidgetsData;

  const widgetCards = widgetsData.map((widget, index, sizeOptions) => {
    const widgetComponent = (
      <WidgetWrapper
        widget={widget}
        locationText={widgetsStore.newsFlashWidgetsMetaLocation}
        segmentText={widgetsStore.newsFlashWidgetsMetaSegmentName}
        sizeOptions={sizeOptions}
        isStreet={widgetsStore.isStreet}
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
          dateComment={widgetsStore.newsFlashWidgetsMetaDateComment}
          roadNumber={widgetsStore.newsFlashWidgetsMetaRoadNumber}
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
