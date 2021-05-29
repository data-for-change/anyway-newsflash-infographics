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

  active: {
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

  const getLogoByFilter = (type: SourceFilterEnum) => {
    switch (type) {
      case SourceFilterEnum.ynet: {
        return ynetLogo;
      }
      case SourceFilterEnum.walla: {
        return wallaLogo;
      }
      case SourceFilterEnum.mda: {
        return madaLogo;
      }
    }
  };

  return (
    <Box className={classes.container}>
      {Object.values(SourceFilterEnum).map((filter: SourceFilterEnum) => {
        const logo = getLogoByFilter(filter);
        return (
          <AnyWayButton
            className={classnames(classes.button, {
              [classes.active]: store.newsFlashActiveFilter === filter,
            })}
            onClick={() => store.setActiveNewsFlashFilter(filter)}
          >
            {filter === SourceFilterEnum.all ? (
              <Typography.Title2>{t('filterPanel.all')}</Typography.Title2>
            ) : (
              <img className={classes.image} src={logo} alt={filter} />
            )}
          </AnyWayButton>
        );
      })}
    </Box>
  );
};

export default NewsFlashFilterPanel;
