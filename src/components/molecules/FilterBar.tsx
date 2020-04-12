import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles, Divider, Grid } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import SelectButton from '../atoms/SelectButton';

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1
    }
  })
);

const FilterBar: FunctionComponent<IProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position='static' color='transparent' elevation={0}>
        <Toolbar variant='dense'>
          <Grid container>
            <Grid item xs={12} md={3}>
              <SelectButton />
            </Grid>
            <Grid item xs={12} md={3}>
              <SelectButton />
            </Grid>
            <Grid item xs={12} md={3}>
              <SelectButton />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
};

export default FilterBar;
