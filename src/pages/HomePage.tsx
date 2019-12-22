import React, {FunctionComponent} from 'react';
import {Box} from '@material-ui/core';

interface IProps {
}

export const HomePage: FunctionComponent<IProps> = () => {
  // remove when no longer required
  const devStyles = {
    border: '2px dashed gray',
    direction: 'ltr' as 'ltr',
    padding: 20
  };
  
  return(
    <Box style={devStyles} height="100%">
      HomePage - this is the place to add widgets. a widget is a self-contained component which can be presented on the homepage,
      like an item in a <a href="https://material-ui.com/components/grid-list/" target="_blank">grid</a> or - in a modal.
      <Box display="flex">
        <div style={devStyles}>
          <h5>HeatMapWidget</h5>
          <p>HeatMapWidget(template) is an aware widget - it can fetch data from the store</p>
          <p>HeatMapWidget contain an un-aware component called HeatMapView(molecule) </p>
        </div>
  
        <div style={devStyles}>
          <h5>PieChartWidget</h5>
          <p>PieChartWidget(template) is an aware widget - it can fetch data from the store</p>
          <p>PieChartWidget contain an un-aware component called PieChartView(molecule) </p>
        </div>
      </Box>
    </Box>
  );
};
