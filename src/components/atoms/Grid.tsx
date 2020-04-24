import React from 'react';
import { default as MaterialGrid } from '@material-ui/core/Grid';

interface IProps {}

const GridContainer: React.FC<IProps> = ({ children }) => {
  const devStyles = {
    maxWidth: '100%',
    justifyContent: 'center',
    padding: 20,
    overflow: 'auto',
  };
  return (
    <MaterialGrid style={devStyles} container>
      {children}
    </MaterialGrid>
  );
};

const GridItem: React.FC<IProps> = ({ children }) => {
  return (
    <MaterialGrid item xs={12} sm={6} lg={4} xl={3}>
      {children}
    </MaterialGrid>
  );
};

const Grid = {
  Container: GridContainer,
  Item: GridItem,
};

export default Grid;
