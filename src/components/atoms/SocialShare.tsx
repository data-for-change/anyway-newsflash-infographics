import { Box } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

const ICON_SIZE = 24;

const useStyles = makeStyles({
  socialShareButton: {
    outline: 'none',
  },
});

const SocialShare = () => {
  const classes = useStyles();
  const url = window.location.origin;
  return (
    <Box display="flex">
      <Box p={1}>
        <FacebookShareButton url={url} className={classes.socialShareButton}>
          <FacebookIcon round size={ICON_SIZE} />
        </FacebookShareButton>
      </Box>
      <Box p={1}>
        <TwitterShareButton url={url} className={classes.socialShareButton}>
          <TwitterIcon round size={ICON_SIZE} />
        </TwitterShareButton>
      </Box>
    </Box>
  );
};
export default SocialShare;
