import React, {FunctionComponent} from 'react';
import {Box} from '@material-ui/core';
import  News from './News';
import {NewsFlashFilterPanel} from "../atoms/NewsFlahsFilterPanel";
interface IProps {
}

// remove when no longer required
const devStyles = {
    border: '2px dashed blue',
    height:'100%'
};
export const SideBar: FunctionComponent<IProps> = () => {

  return (
      <Box style={devStyles} >
          <NewsFlashFilterPanel />
        <News/>
      </Box>
  );
};
