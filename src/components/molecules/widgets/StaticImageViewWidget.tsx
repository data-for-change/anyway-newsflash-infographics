import React, { FC } from 'react';
import { IWidgetVisionZeroImageData } from '../../../models/WidgetData';
import ImageView from '../ImageView';

interface IProps {
  data: IWidgetVisionZeroImageData;
}
const StaticImageViewWidget: FC<IProps> = ({ data }) => {
  return <ImageView data={data} />;
};
export default StaticImageViewWidget;
