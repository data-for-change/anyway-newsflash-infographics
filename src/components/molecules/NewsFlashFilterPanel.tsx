import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {borderColor} from '../../style/_globals';
import ynetLogo from '../../assets/ynet-website-logo.svg';
import wallaLogo from '../../assets/walla-logo.svg';
import mdaLogo from '../../assets/mda-logo.svg';
import {AnyWayButton} from "../atoms/AnyWayButton";
import RootStore from '../../store/root.store';
import {useStore} from '../../store/storeConfig';
import {SourceFilterEnum} from '../../models/SourceFilter';
import {Text, TextType} from '../atoms';

const useStyles = makeStyles({
    image: {
      maxWidth:'100%',
      maxHeight:'100%'
    },
    button: {
      height: '50px',
      width: '50px',
      border:  `1px solid ${borderColor}`,
    },
    container: {
        paddingTop: '16px',
        paddingBottom: '20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});
export const NewsFlashFilterPanel: React.FC = () => {
  const classes = useStyles();
  const store: RootStore = useStore();

  return (
        // will be convert to filterButtonsMap instead of code duplicate for the filter button
        <Box className={classes.container}>
            <AnyWayButton  className={classes.button} onClick={() => {
              store.filterNewsFlashCollection(SourceFilterEnum.all);
            }}>
               {/* <Text type={TextType.CONTENT_TITLE} children="הכל" /> */}
               <Text type={TextType.CONTENT_TITLE}>הכל</Text>
            </AnyWayButton>
            <AnyWayButton className={classes.button} onClick={() => {
              store.filterNewsFlashCollection(SourceFilterEnum.ynet);
            }}>
                <img className={classes.image} src={ynetLogo} alt="Ynet"/>
            </AnyWayButton>
            <AnyWayButton className={classes.button} onClick={() => {
            }}>
                <img className={classes.image} src={wallaLogo} alt="Walla"/>
            </AnyWayButton>
            <AnyWayButton className={classes.button} onClick={() => {
                store.filterNewsFlashCollection(SourceFilterEnum.mda);
            }}>
                <img className={classes.image} src={mdaLogo} alt="Magen David Adom"/>
            </AnyWayButton>
        </Box>
    )
};
