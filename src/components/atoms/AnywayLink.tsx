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
  // @ts-ignore
  return <div>
    <Link className={classes.link} {...props} />
  </div>;
};
export default AnyWayLink;
