import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface LogoProps {
  src: string;
  alt: string;
  height: string;
  onClick?: () => any;
}

const useStyles = makeStyles({
  link: {
    cursor: 'pointer',
  },
});

export const Logo: FC<LogoProps> = ({ src, alt, height, onClick }) => {
  const classes = useStyles();
  return <img className={classes.link} src={src} alt={alt} height={`${height}`} onClick={onClick} />;
};
