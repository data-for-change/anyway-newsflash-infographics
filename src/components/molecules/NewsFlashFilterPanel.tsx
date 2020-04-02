import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {borderColor} from '../../style/_globals';
import ynetLogo from '../../assets/ynet-website-logo.svg';
import wallaLogo from '../../assets/walla-logo.svg';
import {AnyWayButton} from "../atoms/AnyWayButton";

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
    return (
        // will be convert to filterButtonsMap instead of code duplicate for the filter button
        <Box className={classes.container}>
            <AnyWayButton className={classes.button} onClick={() => {
            }}>
                <img className={classes.image} src={ynetLogo} alt="Ynet"/>
            </AnyWayButton>
            <AnyWayButton className={classes.button} onClick={() => {
            }}>
                <img className={classes.image} src={wallaLogo} alt="Walla"/>
            </AnyWayButton>
        </Box>
    )
};
