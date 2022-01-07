import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const PREFIX = 'MetaTag';

const classes = {
  root: `${PREFIX}-root`,
};

const Root = styled('div')({
  [`& .${classes.root}`]: {
    display: process.env.REACT_APP_SHOW_META_TAGS === 'true' ? 'block' : 'none',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

const MetaTag: FC = ({ children }) => {
  return <Root className={classes.root}>{children}</Root>;
};

export default MetaTag;
