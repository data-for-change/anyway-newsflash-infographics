import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, LinkProps } from 'react-router-dom';
import { onLinkColor } from '../../style/_globals';
import { onLinkColorHover } from '../../style/_globals';

const useStyles = makeStyles({
  link: {
    color: `${onLinkColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
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
