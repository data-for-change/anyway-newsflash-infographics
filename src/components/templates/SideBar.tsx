import React, {FunctionComponent} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import News from './News';
import {NewsFlashFilterPanel} from "../atoms/NewsFlahsFilterPanel";

interface IProps {
}

export const SideBar: FunctionComponent<IProps> = () => {
    const useStyles = makeStyles({
        root: {
            borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
        }
    });
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <NewsFlashFilterPanel/>
            <News/>
        </Box>
    );
};
