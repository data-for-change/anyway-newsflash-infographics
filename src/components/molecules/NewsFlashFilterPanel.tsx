import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { borderColor } from '../../style';
import ynetLogo from '../../assets/ynet-website-logo.svg';
import wallaLogo from '../../assets/walla-logo.svg';
import madaLogo from '../../assets/mada-logo.svg';
import { AnyWayButton } from '../atoms/AnyWayButton';
import RootStore from '../../store/root.store';
import { useStore } from '../../store/storeConfig';
import { SourceFilterEnum } from '../../models/SourceFilter';
import { Text, TextType } from '../atoms';

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
  container: {
    paddingTop: '16px',
    paddingBottom: '20px',
    marginRight: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
export const NewsFlashFilterPanel: React.FC = () => {
  const classes = useStyles();
  const store: RootStore = useStore();

  return (
    // will be convert to filterButtonsMap instead of code duplicate for the filter button
    <Box className={classes.container}>
      <AnyWayButton
        className={classes.button}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.all);
        }}
      >
        <Text type={TextType.CONTENT_TITLE}>הכל</Text>
      </AnyWayButton>
      <AnyWayButton
        className={classes.button}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.ynet);
        }}
      >
        <img className={classes.image} src={ynetLogo} alt="Ynet" />
      </AnyWayButton>
      <AnyWayButton className={classes.button} onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.walla);
        }}>
        <img className={classes.image} src={wallaLogo} alt="Walla" />
      </AnyWayButton>
      <AnyWayButton
        className={classes.button}
        onClick={() => {
          store.filterNewsFlashCollection(SourceFilterEnum.mda);
        }}
      >
        <img className={classes.image} src={madaLogo} alt="Magen David Adom" />
      </AnyWayButton>
    </Box>
  );
};
