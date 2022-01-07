import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import logoHasdna from 'assets/hasadna.png';
import { Typography } from 'components/atoms';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { oceanBlueColor, silverSmokeColor, skyBlueColor } from 'style';
import { version } from '../../../package.json'; // eslint-disable-line
import AboutDialog from './AboutDialog';
import ThankYouDialog from './ThankYouDialog';

const PREFIX = 'Footer';

const classes = {
  logo: `${PREFIX}-logo`,
  footer: `${PREFIX}-footer`,
  items: `${PREFIX}-items`,
  linkItem: `${PREFIX}-linkItem`,
  infoItem: `${PREFIX}-infoItem`,
};

const Root = styled('footer')({
  [`& .${classes.logo}`]: {
    height: '30px',
  },
  [`&.${classes.footer}`]: {
    flexGrow: 1,
    display: 'flex',
    border: `1px solid ${silverSmokeColor}`,
  },
  [`& .${classes.items}`]: {
    display: 'flex',
    alignItems: 'center',
    color: `${oceanBlueColor}`,
    textDecoration: 'none',
    justifyContent: 'flex-start',
  },
  [`& .${classes.linkItem}`]: {
    borderInlineEnd: `2px solid ${silverSmokeColor}`,
    cursor: 'pointer',
    transition: 'color 0.3s',
    '&:hover': {
      color: `${skyBlueColor}`,
    },
  },
  [`& .${classes.infoItem}`]: {
    borderInlineEnd: `2px solid ${silverSmokeColor}`,
  },
});

interface IProps {}

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

  return (
    <Root className={classes.footer}>
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
    </Root>
  );
};
