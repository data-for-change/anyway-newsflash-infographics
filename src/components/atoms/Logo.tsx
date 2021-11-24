import { styled } from '@mui/material/styles';
import React, { FC } from 'react';

const PREFIX = 'Logo';

const classes = {
  link: `${PREFIX}-link`,
};

const Root = styled('img')({
  [`&.${classes.link}`]: {
    cursor: 'pointer',
  },
});

interface LogoProps {
  src: string;
  alt: string;
  height: number;
  onClick?: () => any;
}

const Logo: FC<LogoProps> = ({ src, alt, height, onClick }) => {
  return <Root className={classes.link} src={src} alt={alt} height={`${height}`} onClick={onClick} />;
};

export default Logo;
