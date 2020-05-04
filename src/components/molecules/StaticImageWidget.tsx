import React, { FC } from 'react';
import { IWidgetStaticImg } from '../../models/WidgetData';
import VisionZeroImg from '../../assets/vision_zero.png';
import { SignalWifi1BarLockSharp } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';

let imageStyles = {
    margin: '15px',
	backgroundColor: 'gray',
	border: '5px dashed green',
	width: '90%',
	height: '80%',
	
  };
interface IProps {
  data: IWidgetStaticImg[];
}
const StaticImg: FC<IProps> = () => {
	return (
		<img src= {VisionZeroImg} style= {imageStyles} alt="vision zero" />
	);
};
export default StaticImg;