import React, { FC, useCallback, useState, useEffect } from 'react';
import { makeStyles, createStyles, Divider, Grid, Box } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import SelectButton from '../atoms/SelectButton';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/storeConfig';
import RootStore from '../../store/root.store';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Typography, Button } from '../atoms';
import { useTranslation } from 'react-i18next';

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    locationMeta: {
      alignSelf: 'flex-start',
    },
    showDescriptionButton: {
      alignSelf: 'baseline',
    },
  }),
);

const FilterBar: FC<IProps> = () => {
  const store: RootStore = useStore();
  const classes = useStyles();
  const onFilterChange = useCallback((value: number) => store.changeTimeFilter(value), [store]);
  const { t } = useTranslation();
  const [isDescOpen, setIsDescOpen] = useState(false);

  const queryParam: string | null = useLocation().search;
  useEffect(() => {
    const filterValFromUrl: number | null = queryParam
      ? parseInt(queryString.parse(queryParam)['years_ago'] as string)
      : null;
    if (filterValFromUrl) {
      store.changeTimeFilter(filterValFromUrl);
    }
  }, [queryParam, store]);

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar variant="dense">
          <Grid container spacing={2} alignItems="baseline">
            <Grid item>
              <SelectButton onChange={onFilterChange} />
            </Grid>
            <Grid item>
              <Grid item container spacing={2}>
                <Grid item className={classes.locationMeta}>
                  <Typography.Body2>{store.newsFlashWidgetsMetaLocation}</Typography.Body2>
                </Grid>
                <Grid item className={classes.showDescriptionButton}>
                  <Button.Standard size="small" onClick={() => setIsDescOpen(!isDescOpen)}>
                    {isDescOpen ? t('filterBar.Hide Details') : t('filterBar.Show Details')}
                  </Button.Standard>
                </Grid>
              </Grid>
              {isDescOpen && (
                <Grid item>
                  <Box mt={1}>
                    <Typography.Body3>{store.activeNewsFlash?.description}</Typography.Body3>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
};

export default observer(FilterBar);
