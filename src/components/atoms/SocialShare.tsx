import { Box } from '@mui/material/';
import { styled } from '@mui/material/styles';
import React from 'react';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

const PREFIX = 'SocialShare';

const classes = {
  socialShareButton: `${PREFIX}-socialShareButton`,
};

const StyledBox = styled(Box)({
  [`& .${classes.socialShareButton}`]: {
    outline: 'none',
  },
});

const ICON_SIZE = 24;

const SocialShare = () => {
  const url = window.location.origin;
  return (
    <StyledBox display="flex">
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
    </StyledBox>
  );
};
export default SocialShare;
