import React, { FC, useCallback } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import { Theme, makeStyles } from '@material-ui/core';
import { brightGreyColor } from '../../../style';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import TextViewList from './TextViewList';
import TextViewHeader from './TextViewHeader';
import SeverityImage from './SeverityImage';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    top: '10%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    letterSpacing: 1,
    alignItems: 'center',
  },
  headerBase: {
    width: '70%',
    height: '20%',
  },
  list: {
    width: '80%',
    height: '100%',
    alignSelf: 'flex-end',
  },
  singleTypeImage: {
    height: '40%',
    width: 'auto',
  },
  headerSingleType: {
    position: 'relative',
    bottom: '20%',
  },
  headerList: {
    alignSelf: 'center',
  },
}));

const TextView: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyles();
  //extract counts by severity type fields
  const countsData = Object.assign(
    [data.items.severity_fatal_count, data.items.severity_light_count, data.items.severity_severe_count].filter(
      Boolean,
    ),
  );
  const findSingleType = useCallback(() => {
    const countsTypes = Object.keys(countsData);
    return countsTypes.length === 1 ? countsTypes[0] : undefined;
  }, [countsData]);

  const singleType: string | undefined = findSingleType();
  const headerClass = classNames(classes.headerBase, singleType ? classes.headerSingleType : classes.headerList);
  return (
    <div className={classes.root}>
      <Box className={headerClass} color={brightGreyColor} textAlign="center">
        <TextViewHeader singleType={singleType} data={data} segmentText={segmentText} />
      </Box>
      {countsData ? (
        <Box color="text.secondary" className={classes.list}>
          <TextViewList data={countsData} />
        </Box>
      ) : (
        singleType && <SeverityImage severity={singleType!} />
      )}
    </div>
  );
};
export default TextView;
