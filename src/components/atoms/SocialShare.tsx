import React from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import Box from '@material-ui/core/Box';

const ICON_SIZE = 24;

const SocialShare = () => {
  const url = window.location.origin;
  return (
    <Box display="flex">
      <Box p={1}>
        <FacebookShareButton url={url}>
          <FacebookIcon round size={ICON_SIZE} />
        </FacebookShareButton>
      </Box>
      <Box p={1}>
        <TwitterShareButton url={url}>
          <TwitterIcon round size={ICON_SIZE} />
        </TwitterShareButton>
      </Box>
    </Box>
  );
};
export default SocialShare;
