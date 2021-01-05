import React from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import { makeStyles } from '@material-ui/styles';

const ICON_SIZE = 24;

const useStyles = makeStyles({
  root: {
    '& *': {
      padding: '6px 8px',
    },
  },
});
const SocialShare = () => {
  const classes = useStyles();
  const url = window.location.origin;
  return (
    <div className={classes.root}>
      <FacebookShareButton url={url}>
        <FacebookIcon round size={ICON_SIZE} />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon round size={ICON_SIZE} />
      </TwitterShareButton>
    </div>
  );
};
export default SocialShare;
