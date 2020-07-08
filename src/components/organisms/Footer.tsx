import React, { FC, useState } from 'react';
import logoHasdna from '../../assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Text, TextType } from '../atoms';
import { borderColor, onLinkColor, onLinkColorHover } from '../../style';
import ThankYouDialog from './ThankYouDialog';
import AboutDialog from './AboutDialog';

interface IProps {}
const useStyles = makeStyles({
  logo: {
    height: '30px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    color: `${onLinkColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
    },
    justifyContent: 'flex-start',
  },
  footer: {
    flexGrow: 1,
    display: 'flex',
    border: `1px solid ${borderColor}`,
  },
  linkItem: {
    borderLeft: `2px solid ${borderColor}`,
  },
});

export const Footer: FC<IProps> = () => {
  const [isShowingAbout, setIsShowingAbout] = useState(false);
  const [isShowingThank, setIsShowingThank] = useState(false);
  const toggleAbout = () => {
    setIsShowingAbout(!isShowingAbout);
  };
  const toggleThank = () => {
    setIsShowingThank(!isShowingThank);
  };
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box className={classes.links}>
        <Box pr={1}>
          <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
            <img src={logoHasdna} alt="logo-hasadna" className={classes.logo} />
          </a>
        </Box>
        <Box px={2} className={classes.linkItem} onClick={toggleAbout}>
          <Text type={TextType.CONTENT_TITLE}>אודות</Text>
        </Box>
        <AboutDialog isShowing={isShowingAbout} onClose={toggleAbout} />
        <Box px={2} className={classes.linkItem} onClick={toggleThank}>
          <Text type={TextType.CONTENT_TITLE}>תודות</Text>
        </Box>
        <ThankYouDialog isShowing={isShowingThank} onClose={toggleThank} />
      </Box>
    </footer>
  );
};
