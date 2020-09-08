import React, { FC, useCallback, useState } from 'react';
import { makeStyles, createStyles, Divider, Grid } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import SelectButton from '../atoms/SelectButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { Text, TextType, Button } from '../atoms';

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    locationMeta: {
      display: 'flex',
      alignItems: 'center',
    },
    showDescriptionButton: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const FilterBar: FC<IProps> = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const onFilterChange = useCallback((value: number) => store.changeTimeFilter(value), [store]);
  const [isDescOpen, setIsDescOpen] = useState(false);

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item>
              <SelectButton initialValue={0} onChange={onFilterChange} />
            </Grid>
            <Grid item className={classes.locationMeta}>
              <Text type={TextType.CONTENT_TITLE}>{store.newsFlashWidgetsMetaString}</Text>
            </Grid>
            <Grid item className={classes.showDescriptionButton}>
              <Button.Standard onClick={() => setIsDescOpen(!isDescOpen)}>
                {isDescOpen ? 'הסתר פרטים' : 'הצג פרטים'}
              </Button.Standard>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
      {isDescOpen && (
        <Text type={TextType.CONTENT}>
          {store.newsFlashCollection.map((news) => {
            if (news.id === store.activeNewsFlashId) return news.title;
            return '';
          })}
        </Text>
      )}
    </div>
  );
};

export default observer(FilterBar);
