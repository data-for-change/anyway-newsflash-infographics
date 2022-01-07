import { AppBar, Box, Divider, Grid, Toolbar } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { Button, Typography } from 'components/atoms';
import SelectButton from 'components/atoms/SelectButton';
import { observer } from 'mobx-react-lite';
import queryString from 'query-string';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import RootStore from 'store/root.store';
import { useStore } from 'store/storeConfig';

const PREFIX = 'FilterBar';

const classes = {
  grow: `${PREFIX}-grow`,
  descriptionHeader: `${PREFIX}-descriptionHeader`,
};

const Root = styled('div')(() => ({
  [`&.${classes.grow}`]: {
    flexGrow: 1,
  },

  [`& .${classes.descriptionHeader}`]: {
    alignItems: 'center',
  },
}));

interface IProps {}

const FilterBar: FC<IProps> = () => {
  const store: RootStore = useStore();

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
    <Root className={classes.grow}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar variant="dense">
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SelectButton onChange={onFilterChange} />
            </Grid>
            <Grid item>
              <Grid item container spacing={2} className={classes.descriptionHeader}>
                <Grid item>
                  <Typography.Body2 bold>{store.newsFlashWidgetsMetaLocation}</Typography.Body2>
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
                  <Typography.Body3>{store.activeNewsFlash?.description}</Typography.Body3>
                </Box>
              </Grid>
            </Collapse>
          </Grid>
        </Toolbar>
      </AppBar>
      <Divider />
    </Root>
  );
};

export default observer(FilterBar);
