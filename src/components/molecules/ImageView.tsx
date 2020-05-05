import React, { FC } from 'react';
import { IWidgetVisionZeroImage } from '../../models/WidgetData';
import visionZeroImage from '../../assets/vision-zero.png';
import { makeStyles } from '@material-ui/core';

//Image SRC hardcoded,
interface IProps {
  data: IWidgetVisionZeroImage[];
}
const useStyles = makeStyles(() => ({
  root: {
    borderRadius: '10px',
    margin: '15px',
    backgroundColor: 'gray',
    border: '5px dashed green',
    width: '90%',
    height: '100%',
  },
}));
const ImageView: FC<IProps> = (props) => {
  const classes = useStyles();
  return (
    <div>
      <img src={visionZeroImage} className={classes.root} alt="vision zero" />
    </div>
  );
};
export default ImageView;
