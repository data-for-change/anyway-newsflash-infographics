import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { oceanBlueColor, skyBlueColor } from 'style';

const useStyles = makeStyles({
  link: {
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
  const classes = useStyles();
  return <RouterLink className={classes.link} {...props} />;
};
export default Link;
