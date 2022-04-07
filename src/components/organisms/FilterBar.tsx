import React, { FC, useCallback, useState, useEffect } from 'react';
import { makeStyles, createStyles, Divider, Grid, Box } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';
import SelectButton from 'components/atoms/SelectButton';
import { observer } from 'mobx-react-lite';
import { useStore } from 'store/storeConfig';
import RootStore from 'store/root.store';
import { useLocation } from 'react-router';
import queryString from 'query-string';
import { Typography, Button } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import Collapse from '@material-ui/core/Collapse';

interface IProps {}

const useStyles = makeStyles(() =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    descriptionHeader: {
      alignItems: 'center',
    },
  }),
);

const FilterBar: FC<IProps> = () => {
  const store: RootStore = useStore();
  const { widgetsStore } = store;
  const classes = useStyles();
  const { newsFlashStore } = store;
  const onFilterChange = useCallback((value: number) => newsFlashStore.changeTimeFilter(value), [newsFlashStore]);
  const { t } = useTranslation();
  const [isDescOpen, setIsDescOpen] = useState(false);

  const queryParam: string | null = useLocation().search;
  useEffect(() => {
    const filterValFromUrl: number | null = queryParam
      ? parseInt(queryString.parse(queryParam)['years_ago'] as string)
      : null;
    if (filterValFromUrl) {
      newsFlashStore.changeTimeFilter(filterValFromUrl);
    }
  }, [queryParam, newsFlashStore]);

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar variant="dense">
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SelectButton onChange={onFilterChange} />
            </Grid>
            <Grid item>
              <Grid item container spacing={2} className={classes.descriptionHeader}>
                <Grid item>
                  <Typography.Body2 bold>{widgetsStore.newsFlashWidgetsMetaLocation}</Typography.Body2>
                </Grid>
                <Grid item>
                  <Button.Standard onClick={() => setIsDescOpen(!isDescOpen)}>
                    {isDescOpen ? t('filterBar.Hide Details') : t('filterBar.Show Details')}
                  </Button.Standard>
                </Grid>
              </Grid>
            </Grid>
            <Collapse in={isDescOpen} timeout="auto">
              <Grid item lg={12}>
                <Box mb={2} px={3}>
                  <Typography.Body3>{newsFlashStore.activeNewsFlash?.description}</Typography.Body3>
                </Box>
              </Grid>
            </Collapse>
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </div>
  );
};

export default observer(FilterBar);
