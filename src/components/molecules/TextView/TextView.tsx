import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import { makeStyles } from '@material-ui/core';
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

export interface CountBySeverity {
  fatal: number;
  severe: number;
  light: number;
}

const useStyles = makeStyles(() => ({
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

function getSingleType(countBySeverity: CountBySeverity): string {
  if (countBySeverity.fatal) {
    return 'fatal';
  }
  if (countBySeverity.severe) {
    return 'severe';
  }
  if (countBySeverity.light) {
    return 'light';
  } else {
    return '';
  }
}

const TextView: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyles();

  const countBySeverity: CountBySeverity = {
    fatal: data?.items.severity_fatal_count,
    severe: data?.items.severity_severe_count,
    light: data?.items.severity_light_count,
  };
  const howManySeverities = [!!countBySeverity.fatal, !!countBySeverity.severe, !!countBySeverity.light];
  const isSingleType = howManySeverities.filter(Boolean).length === 1;

  const headerClass = classNames(classes.headerBase, isSingleType ? classes.headerSingleType : classes.headerList);
  return (
    <div className={classes.root}>
      <Box className={headerClass} color={brightGreyColor} textAlign="center">
        <TextViewHeader
          singleType={isSingleType ? getSingleType(countBySeverity) : ''}
          data={data}
          segmentText={segmentText}
        />
      </Box>
      {isSingleType ? (
        <SeverityImage severity={getSingleType(countBySeverity)!} />
      ) : (
        <Box color="text.secondary" className={classes.list}>
          <TextViewList data={countBySeverity} />
        </Box>
      )}
    </div>
  );
};
export default TextView;
