import React, {FunctionComponent} from 'react';
import {Box} from '@material-ui/core';

interface IProps {
}

export const SideBar: FunctionComponent<IProps> = () => {
  // remove when no longer required
  const devStyles = {
    border: '2px dashed blue'
  };
  
  return(
    <Box style={devStyles} height="100%">
      Sidebar
    </Box>
  );
};
