import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import ynetLogo from '../../assets/Ynet_website_logo.svg';
import wallaLogo from '../../assets/walla-logo.svg';
import {AnyWayButton} from "./AnyWayButton";

const useStyles = makeStyles({
    image: {
        height: '70%',
        width: '70%'
    },
    button: {
        Height: '30%',
        maxWidth: '20%',
        border: '0.5px solid grey',
        boxShadow: '1px 1px 1px 1px #888888'
    },
    container: {
        height: '7%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
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
