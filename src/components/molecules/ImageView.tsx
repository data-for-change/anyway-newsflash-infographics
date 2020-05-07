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
    borderRadius: '10px',
    margin: '15px',
    border: '5px solid gray',
    width: '90%',
    height: '100%',
  },
}));
const ImageView: FC<IProps> = ({data}) => {
  // todo: set image based on data
  const classes = useStyles();
  return (
    <div>
      <img src= { visionZeroImage } className={classes.root} alt="vision zero" />
    </div>
  );
};
export default ImageView;
