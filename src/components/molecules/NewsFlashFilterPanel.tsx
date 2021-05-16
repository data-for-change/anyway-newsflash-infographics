import React, { FC } from 'react';
import classnames from 'classnames';
import { Box, makeStyles } from '@material-ui/core';
import { silverSmokeColor, oceanBlueColor } from '../../style';
import ynetLogo from '../../assets/ynet-website-logo.svg';
import wallaLogo from '../../assets/walla-logo.svg';
import madaLogo from '../../assets/mada-logo.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import RootStore from '../../store/root.store';
import { useStore } from '../../store/storeConfig';
import { SourceFilterEnum } from '../../models/SourceFilter';
import { Typography } from '../atoms';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  image: {
    maxWidth: '50px',
    maxHeight: '35px',
  },
  button: {
    height: '50px',
    marginLeft: '10px',
    width: '50px',
    border: `1px solid ${silverSmokeColor}`,
  },

  buttonClicked: {
    border: `2px solid ${silverSmokeColor}`,
    borderColor: oceanBlueColor,
  },

  container: {
    paddingTop: '16px',
    paddingBottom: '20px',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    justifyContent: 'space-evenly',
    borderBottom: `1px solid ${silverSmokeColor}`,
  },
});

interface IProps {}
const NewsFlashFilterPanel: FC<IProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const store: RootStore = useStore();

  return (
    // will be convert to filterButtonsMap instead of code duplicate for the filter button
    <Box className={classes.container}>
      <AnyWayButton
        className={
          store.newsFlashActiveFilter === SourceFilterEnum.all
            ? classnames(classes.buttonClicked, classes.button)
            : classes.button
        }
        onClick={() => {
          store.setActiveNewsFlashFilter(SourceFilterEnum.all);
        }}
      >
        <Typography.Title2>{t('filterPanel.all')}</Typography.Title2>
      </AnyWayButton>
      <AnyWayButton
        className={
          store.newsFlashActiveFilter === SourceFilterEnum.ynet
            ? classnames(classes.buttonClicked, classes.button)
            : classes.button
        }
        onClick={() => {
          store.setActiveNewsFlashFilter(SourceFilterEnum.ynet);
        }}
      >
        <img className={classes.image} src={ynetLogo} alt="Ynet" />
      </AnyWayButton>
      <AnyWayButton
        className={
          store.newsFlashActiveFilter === SourceFilterEnum.walla
            ? classnames(classes.buttonClicked, classes.button)
            : classes.button
        }
        onClick={() => {
          store.setActiveNewsFlashFilter(SourceFilterEnum.walla);
        }}
      >
        <img className={classes.image} src={wallaLogo} alt="Walla" />
      </AnyWayButton>
      <AnyWayButton
        className={
          store.newsFlashActiveFilter === SourceFilterEnum.mda
            ? classnames(classes.buttonClicked, classes.button)
            : classes.button
        }
        onClick={() => {
          store.setActiveNewsFlashFilter(SourceFilterEnum.mda);
        }}
      >
        <img className={classes.image} src={madaLogo} alt="Magen David Adom" />
      </AnyWayButton>
    </Box>
  );
};

export default NewsFlashFilterPanel;
