import {makeStyles} from '@material-ui/core/styles';
import {onLinkColor, onLinkColorHover} from '../../style';
import Text, {TextType} from "../atoms/Text";
import React from "react";


const LINK =  `${process.env.REACT_APP_BASE_URL}/auth/google-login`;


const useStyles = makeStyles({
  link: {
    color: `${onLinkColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
    },
    cursor: 'pointer',
  },
});
const LogInLinkGoogle = () => {
  const classes = useStyles();
  return (
    <a className={classes.link} href={LINK}>
      <Text type={TextType.CONTENT}>LOGIN</Text>
    </a>
  );
};

export default LogInLinkGoogle;

