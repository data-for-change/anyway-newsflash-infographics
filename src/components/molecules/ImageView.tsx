import React, { FC } from 'react';
import { IWidgetVisionZeroImageData } from 'models/WidgetData';


import { makeStyles } from '@material-ui/core';

interface IProps {
  data: IWidgetVisionZeroImageData;
}
const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  image: {
    borderRadius: '10px',
    border: '1px solid gray',
    width: '100%',
    height: '100%',
  },
}));
const ImageView: FC<IProps> = ({ data }) => {

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <img src={data.items.image_src} className={classes.image} alt="vision zero 2 plus 1" />
    </div>
  );
};
export default ImageView;
