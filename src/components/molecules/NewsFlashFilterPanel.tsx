import React, { useState } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { borderColor, onLinkColor } from '../../style';
import ynetLogo from '../../assets/ynet-website-logo.svg';
import wallaLogo from '../../assets/walla-logo.svg';
import madaLogo from '../../assets/mada-logo.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import RootStore from '../../store/root.store';
import { useStore } from '../../store/storeConfig';
import { SourceFilterEnum } from '../../models/SourceFilter';
import { Typography } from '../atoms';

const useStyles = makeStyles({
  image: {
    maxWidth: '50px',
    maxHeight: '35px',
  },
  button: {
    height: '50px',
    marginLeft: '10px',
    width: '50px',
    border: `1px solid ${borderColor}`,
  },

  buttonClicked: {
    height: '50px',
    marginLeft: '10px',
    width: '50px',
    border: `2px solid ${borderColor}`,
    borderColor: onLinkColor,
  },

  container: {
    paddingTop: '16px',
    paddingBottom: '20px',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    justifyContent: 'space-evenly',
  },
});

export const NewsFlashFilterPanel: React.FC = () => {
  const classes = useStyles();
  const store: RootStore = useStore();
  const [activeFilter, setActiveFilter] = useState(SourceFilterEnum.all);

  const isClicked = (sourceType: SourceFilterEnum) =>
    activeFilter === sourceType ? classes.buttonClicked : classes.button;

  return (
    // will be convert to filterButtonsMap instead of code duplicate for the filter button
    <Box className={classes.container}>
      <AnyWayButton
        className={isClicked(SourceFilterEnum.all)}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.all);
          setActiveFilter(SourceFilterEnum.all);
        }}
      >
        <Typography.Title2>הכל</Typography.Title2>
      </AnyWayButton>
      <AnyWayButton
        className={isClicked(SourceFilterEnum.ynet)}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.ynet);
          setActiveFilter(SourceFilterEnum.ynet);
        }}
      >
        <img className={classes.image} src={ynetLogo} alt="Ynet" />
      </AnyWayButton>
      <AnyWayButton
        className={isClicked(SourceFilterEnum.walla)}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.walla);
          setActiveFilter(SourceFilterEnum.walla);
        }}
      >
        <img className={classes.image} src={wallaLogo} alt="Walla" />
      </AnyWayButton>
      <AnyWayButton
        className={isClicked(SourceFilterEnum.mda)}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.mda);
          setActiveFilter(SourceFilterEnum.mda);
        }}
      >
        <img className={classes.image} src={madaLogo} alt="Magen David Adom" />
      </AnyWayButton>
    </Box>
  );
};
