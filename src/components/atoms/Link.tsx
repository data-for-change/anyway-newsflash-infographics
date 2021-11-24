import { styled } from '@mui/material/styles';
import React, { FC } from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { oceanBlueColor, skyBlueColor } from 'style';

const PREFIX = 'Link';

const classes = {
  link: `${PREFIX}-link`,
};

const StyledRouterLink = styled(RouterLink)({
  [`&.${classes.link}`]: {
    color: `${oceanBlueColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
  },
});

interface IProps extends LinkProps {
  to: string;
}

const Link: FC<IProps> = ({ ...props }) => {
  return <StyledRouterLink className={classes.link} {...props} />;
};
export default Link;
