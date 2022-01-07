import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import madaLogo from 'assets/mada-logo.svg';
import wallaLogo from 'assets/walla-logo.svg';
import ynetLogo from 'assets/ynet-website-logo.svg';
import classnames from 'classnames';
import { Typography } from 'components/atoms';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { SourceFilterEnum } from 'models/SourceFilter';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';
import { oceanBlueColor, silverSmokeColor } from 'style';

const PREFIX = 'NewsFlashFilterPanel';

const classes = {
  image: `${PREFIX}-image`,
  button: `${PREFIX}-button`,
  active: `${PREFIX}-active`,
  container: `${PREFIX}-container`,
};

const StyledBox = styled(Box)({
  [`& .${classes.image}`]: {
    maxWidth: '50px',
    maxHeight: '35px',
  },
  [`& .${classes.button}`]: {
    height: '50px',
    marginLeft: '10px',
    width: '50px',
    border: `1px solid ${silverSmokeColor}`,
  },

  [`& .${classes.active}`]: {
    border: `2px solid ${silverSmokeColor}`,
    borderColor: oceanBlueColor,
  },

  [`&.${classes.container}`]: {
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
    <StyledBox className={classes.container}>
      {Object.values(SourceFilterEnum).map((filter: SourceFilterEnum) => {
        const logo = getLogoByFilter(filter);
        return (
          <AnyWayButton
            className={classnames(classes.button, {
              [classes.active]: store.newsFlashActiveFilter === filter,
            })}
            onClick={() => store.setActiveNewsFlashFilter(filter)}
            key={filter}
          >
            {filter === SourceFilterEnum.all ? (
              <Typography.Title2>{t('filterPanel.all')}</Typography.Title2>
            ) : (
              <img className={classes.image} src={logo} alt={filter} />
            )}
          </AnyWayButton>
        );
      })}
    </StyledBox>
  );
};

export default NewsFlashFilterPanel;
