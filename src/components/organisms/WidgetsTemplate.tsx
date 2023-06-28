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
import { logosSourceMap, OrgLogoData } from 'const/cards.const';

const WidgetsTemplate: FC = () => {
  const store: RootStore = useStore();
  const { t } = useTranslation();
  const { userStore, widgetsStore } = store;
  const widgetsData = widgetsStore.newsFlashWidgetsData;
  const organizationName = userStore.userOrganizations ? userStore.userOrganizations[0] : '';
  const organizationData: OrgLogoData | undefined = logosSourceMap.find((p) => p.key === organizationName);

  const widgetCards = widgetsData.map((widget, index, sizeOptions) => {
    const widgetComponent = (
      <WidgetWrapper
        widget={widget}
        locationText={widgetsStore.newsFlashWidgetsMetaLocation}
        segmentText={widgetsStore.newsFlashWidgetsMetaSegmentName}
        sizeOptions={sizeOptions}
        editorBarOptions={{}}
        isStreet={widgetsStore.isStreet}
      />
    );
    if (!widgetComponent) {
      return null;
    }
        
    return (
      <Box m={2} key={index}>
        <AnyWayCard
          organizationData={organizationData}
          information={widget.meta.information}
          transcription = {widget.data?.text?.transcription}
          widgetName={widget.name}
          title={widget.data?.text?.title}
          subtitle={widget.data?.text?.subtitle}
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
