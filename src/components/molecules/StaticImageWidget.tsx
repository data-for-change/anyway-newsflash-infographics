import React, { FC } from 'react';
import { IWidgetStaticImg } from '../../models/WidgetData';
import Vision_Zero from '../../assets/vision_zero.png';


interface IProps {
  data: IWidgetStaticImg[];
}
const StaticImg: FC<IProps> = ({data}) => {
	console.log( data)

	return (<div >'hello'
		<img src= {Vision_Zero} alt="vision zero" />
	</div>);
};
export default StaticImg;