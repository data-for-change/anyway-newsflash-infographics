import { makeStyles } from '@mui/styles';
import React, { FC } from 'react';

interface LogoProps {
  src: string;
  alt: string;
  height: number;
  onClick?: () => any;
}

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },
});

const Logo: FC<LogoProps> = ({ src, alt, height, onClick }) => {
  const classes = useStyles();
  return <img className={classes.link} src={src} alt={alt} height={`${height}`} onClick={onClick} />;
};

export default Logo;
