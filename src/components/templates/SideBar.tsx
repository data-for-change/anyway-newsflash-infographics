import React, {FunctionComponent} from 'react';
import {Box} from '@material-ui/core';
import  News from './News';
import {NewsFlashFilterPanel} from "../atoms/NewsFlahsFilterPanel";
interface IProps {
}

// remove when no longer required
const devStyles = {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    height:'100%',
    overflow:'scroll'
};
export const SideBar: FunctionComponent<IProps> = () => {

  return (
      <Box style={devStyles} >
          <NewsFlashFilterPanel />
        <News/>
      </Box>
  );
};
