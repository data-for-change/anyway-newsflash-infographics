import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, LinkProps } from 'react-router-dom';
import { oceanBlueColor, skyBlueColor } from '../../style';

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

const AnyWayLink: FC<IProps> = ({ ...props }) => {
  const classes = useStyles();
  return <Link className={classes.link} {...props} />;
};
export default AnyWayLink;
