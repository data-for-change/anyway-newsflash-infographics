import React, { FC } from 'react';
import { IWidgetVisionZeroImage } from '../../models/WidgetData';
import ImageView from './ImageView';

interface IProps {
  data: IWidgetVisionZeroImage[];
}
const StaticImg: FC<IProps> = (props) => {
  console.log('props', props);
  return <ImageView data={props.data} />;
};
export default StaticImg;
