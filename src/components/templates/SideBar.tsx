import React, {FunctionComponent} from 'react';
import {Box} from '@material-ui/core';
import  News from './News';
import {NewsFlashFilterPanel} from "../atoms/NewsFlahsFilterPanel";
import LocationMap from '../molecules/LocationMap';
import {sidBarWidth} from '../../style/_globals';
interface IProps {
}

// remove when no longer required
const devStyles = {
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    height:'100%'
};
export const SideBar: FunctionComponent<IProps> = () => {

  return (
      <Box style={devStyles} >
        <NewsFlashFilterPanel />
        <Box display="flex" flexDirection="column">
          <Box flexGrow="1">
            <News/>
          </Box>
          <Box flexBasis={sidBarWidth} flexShrink={0} height={sidBarWidth} width={sidBarWidth}>
              <LocationMap marker={{ lat: 32.0853, lng: 34.7818 }} />
          </Box>
        </Box>
      </Box>
  );
};
