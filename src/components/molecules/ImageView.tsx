import React, { FC } from 'react';
import { IWidgetVisionZeroImageData } from '../../models/WidgetData';
import visionZeroImage from '../../assets/vision-zero.png';
import { makeStyles } from '@material-ui/core';

//Image SRC hardcoded,

interface IProps {
  data: IWidgetVisionZeroImageData;
}
const useStyles = makeStyles(() => ({
  root: {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center', 
	padding: '0px', 
	height: '100%',  
  },
  image: {
	borderRadius: '10px',
	border: '1px solid gray',
	maxWidth: '100%',
	maxHeight:'100%',

  }
}));
const ImageView: FC<IProps> = ({data}) => {
  // todo: set image based on data
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src= { visionZeroImage } className={classes.image}  alt="vision zero" />
    </div>
  );
};
export default ImageView;
