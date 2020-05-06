import React, { FC } from 'react';
import { IWidgetVisionZeroImage } from '../../models/WidgetData';
import ImageView from './ImageView';

interface IProps {
  data: IWidgetVisionZeroImage[];
}
const VisionZeroImageViewWidget: FC<IProps> = (props) => {
  return <ImageView data={props.data} />;
};
export default VisionZeroImageViewWidget;
