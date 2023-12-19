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

// Helper function to check if a date is within the selected time period
const isWithinTimePeriod = (date: string, selectedTimePeriod: number): boolean => {
  // Convert the date string to a Date object
  const dateObject = new Date(date);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in years
  const yearDifference = currentDate.getFullYear() - dateObject.getFullYear();

  // Check if the year difference is within the selected time period
  return yearDifference <= selectedTimePeriod;
};

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
  const { widgetsStore, newsFlashStore } = store;
  const classes = useStyles();
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

  // Function to handle data download
  const handleDownload = async () => {
    console.log("Download button clicked!");

    try {
      const selectedTimePeriod = newsFlashStore.newsFlashWidgetsTimerFilter;
      const apiUrl = `https://www.anyway.co.il/api/news-flash?source=ynet&news_flash_count=10&road_segment_only=true&interurban_only=true`;

      console.log(`About to fetch data from ${apiUrl}`);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      console.log("Data fetched:", data);

      const filteredData = data.filter((item: any) => {
        return isWithinTimePeriod(item.date, selectedTimePeriod);
      });

      // Convert filteredData to CSV and initiate download
      const csvContent = "data:text/csv;charset=utf-8,"
        + filteredData.map((e: any) => Object.values(e).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "filtered_data.csv");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('An error occurred:', error);
      // Consider adding a user-friendly error message here
    }
  };

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
                  <Button.Standard onClick={handleDownload}>
                    {t('filterBar.Download Data')}
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
