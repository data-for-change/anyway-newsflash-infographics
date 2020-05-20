import {makeStyles} from '@material-ui/core/styles';
import {onLinkColor, onLinkColorHover} from '../../style/_globals';
import Text, {TextType} from "../atoms/Text";
import React from "react";
import {openSignInWindow} from "../../services/signInWindow";
import {getServerUrl} from "../../utils/utils";
import {AnyWayButton} from "../atoms/AnyWayButton";


const LINK = `${getServerUrl()}/auth/google-login`;


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
  const handleClick = () => {
    openSignInWindow(LINK,'Google Authentication');
  }
  return (
    < AnyWayButton className={classes.link} onClick={handleClick}>
      <Text type={TextType.CONTENT_TITLE}>LOGIN</Text>
    </AnyWayButton>
  );
};

export default LogInLinkGoogle;

