import React, { FC } from 'react';
import { IWidgetStaticImg } from '../../models/WidgetData';
import Vision_Zero from '../../assets/vision_zero.png';


const IMAGE_SRC = 'ASSETS_FILES';
const NAME = 'Vision_Zero';

interface IProps {
  data: IWidgetStaticImg[];
}
const StaticImg: FC<IProps> = ({data}) => {
	console.log( data)

	return (<div >'hello'</div>);
};
export default StaticImg;