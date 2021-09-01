import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
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
  shouldReload?: boolean;
}

const Link: FC<IProps> = ({ ...props }) => {
  const classes = useStyles();
  const { shouldReload, to } = props;

  if (shouldReload) {
    return (
      <a className={classes.link} {...props} href={to}>
        {props.children}
      </a>
    );
  }
  return <RouterLink className={classes.link} {...props} />;
};
export default Link;
