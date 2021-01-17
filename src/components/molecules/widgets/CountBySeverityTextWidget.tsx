import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import TextView from '../TextView/TextView';
import RootStore from '../../../store/root.store';
import { useStore } from '../../../store/storeConfig';

interface IProps {
  data: IWidgetCountBySeverityTextData;
}
const CountBySeverityTextWidget: FC<IProps> = ({ data }) => {
  const store : RootStore = useStore();
  return <TextView data={data} segmentText={store.newsFlashWidgetsMetaSegmentName} />;
};
export default CountBySeverityTextWidget;
