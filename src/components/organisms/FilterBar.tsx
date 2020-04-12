import React, { FC, useCallback } from 'react';
import { makeStyles, createStyles, Divider, Grid } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import SelectButton from '../atoms/SelectButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1
    }
  })
);

const FilterBar: FC<IProps> = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const onFilterChange = useCallback((value: number) => store.changeTimeFilter(value), [store]);

  return (
    <div className={classes.grow}>
      <AppBar position='static' color='transparent' elevation={0}>
        <Toolbar variant='dense'>
          <Grid container>
            <Grid item xs={12} md={3}>
              <SelectButton initialValue={0} onChange={onFilterChange}/>
            </Grid>
            {/* TODO: add type / severity filters*/}
            {/*<Grid item xs={12} md={3}>*/}
            {/*  <SelectButton />*/}
            {/*</Grid>*/}
            {/*<Grid item xs={12} md={3}>*/}
            {/*  <SelectButton />*/}
            {/*</Grid>*/}
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
};

export default observer(FilterBar);
