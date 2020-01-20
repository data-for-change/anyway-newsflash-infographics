import React, {FunctionComponent} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import  News from './News';
import {NewsFlashFilterPanel} from "../atoms/NewsFlahsFilterPanel";
interface IProps {
}

export const SideBar: FunctionComponent<IProps> = () => {
  // remove when no longer required
  const useStyles = makeStyles({
    devStyles:{
        border: '2px dashed blue',
        display :'flex',
        flexDirection :'column',
        height :'100%'
    }
  });
    const classes = useStyles();

    return (
      <Box className={classes.devStyles} >
          <NewsFlashFilterPanel/>
        <News/>
      </Box>
  );
};
