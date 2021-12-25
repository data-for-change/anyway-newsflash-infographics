import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logoHasdna from 'assets/hasadna.png';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Typography } from 'components/atoms';
import { silverSmokeColor, oceanBlueColor, skyBlueColor } from 'style';
import ThankYouDialog from './ThankYouDialog';
import AboutDialog from './AboutDialog';
import { version } from '../../../package.json'; // eslint-disable-line

interface IProps {}
const useStyles = makeStyles({
  logo: {
    height: '30px',
  },
  footer: {
    flexGrow: 1,
    display: 'flex',
    border: `1px solid ${silverSmokeColor}`,
  },
  items: {
    display: 'flex',
    alignItems: 'center',
    color: `${oceanBlueColor}`,
    textDecoration: 'none',
    justifyContent: 'flex-start',
  },
  linkItem: {
    borderInlineEnd: `2px solid ${silverSmokeColor}`,
    cursor: 'pointer',
    transition: 'color 0.3s',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
  },
  infoItem: {
    borderInlineEnd: `2px solid ${silverSmokeColor}`,
  },
});

export const Footer: FC<IProps> = () => {
  const [isShowingAbout, setIsShowingAbout] = useState(false);
  const [isShowingThank, setIsShowingThank] = useState(false);
  const { t } = useTranslation();
  const toggleAbout = () => {
    setIsShowingAbout(!isShowingAbout);
  };
  const toggleThank = () => {
    setIsShowingThank(!isShowingThank);
  };
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <Box className={classes.items}>
        <Box pr={1}>
          <a href="https://www.hasadna.org.il/" target="_blank" rel="noopener noreferrer">
            <img src={logoHasdna} alt="logo-hasadna" className={classes.logo} />
          </a>
        </Box>
        <Box px={2} className={classes.infoItem}>
          <Typography.Body5>
            {t('footer.version')} {version}
          </Typography.Body5>
        </Box>
        <Box px={2} className={classes.linkItem} onClick={toggleAbout}>
          <Typography.Body5>{t('footer.about')}</Typography.Body5>
        </Box>
        <AboutDialog isShowing={isShowingAbout} onClose={toggleAbout} />
        <Box px={2} className={classes.linkItem} onClick={toggleThank}>
          <Typography.Body5>{t('footer.acknowledgements')}</Typography.Body5>
        </Box>
        <ThankYouDialog isShowing={isShowingThank} onClose={toggleThank} />
      </Box>
    </footer>
  );
};
