import React, { FC, useState} from 'react';
import logoHasdna from '../../assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
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
    justifyContent: 'space-evenly',
    flexGrow: 1,
  },
  footer: {
    flexGrow: 1,
    display: 'flex',
    border: `1px solid ${borderColor}`,
  },
});

export const Footer: FC<IProps> = () => {
  const [isShowingAbout, setIsShowingAbout] = useState(false);
  const [isShowingThank, setIsShowingThank] = useState(false);
  const toggleAbout = () => {
    setIsShowingAbout(!isShowingAbout)
  }
  const toggleThank = () => {
    setIsShowingThank(!isShowingThank)
  }
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box className={classes.links}>
        <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
          <img src={logoHasdna} alt="logo-hasadna" className={classes.logo} />
        </a>
        <Box onClick={toggleAbout}>אודות</Box>
        <AboutDialog isShowing={isShowingAbout} toggle={toggleAbout} />
        <Box onClick={toggleThank}>תודות</Box>
        <ThankYouDialog isShowing={isShowingThank} toggle={toggleThank} />
      </Box>
    </footer>
  );
};
