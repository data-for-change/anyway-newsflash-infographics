import { styled } from '@mui/material/styles';
import visionZeroImage from 'assets/vision_zero_2_plus_1.jpg';
import { IWidgetVisionZeroImageData } from 'models/WidgetData';
import React, { FC } from 'react';

const PREFIX = 'ImageView';

const classes = {
  root: `${PREFIX}-root`,
  image: `${PREFIX}-image`,
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  [`& .${classes.image}`]: {
    borderRadius: '10px',
    border: '1px solid gray',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

interface IProps {
  data: IWidgetVisionZeroImageData;
}
const ImageView: FC<IProps> = ({ data }) => {
  // todo: set image based on data

  return (
    <Root className={classes.root}>
      <img src={visionZeroImage} className={classes.image} alt="vision zero 2 plus 1" />
    </Root>
  );
};
export default ImageView;
