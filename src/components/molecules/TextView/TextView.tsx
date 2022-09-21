import React, { FC } from 'react';
import { IWidgetCountBySeverityTextDataBase } from 'models/WidgetData';
import { makeStyles } from '@material-ui/core';
import { brightGreyColor } from 'style';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import TextViewList from './TextViewList';
import TextViewHeader from './TextViewHeader';
import SeverityImage from './SeverityImage';

type ISeverityCounts<T> = {
  fatal:T;
  severe:T;
  light:T;
  total:T;
}

export type ICountBySeverity = ISeverityCounts<number>;
export type ISeverityFieldNames = ISeverityCounts<string>;

export interface ITextViewLabels {
  fatal: string;
  severe: string;
  light: string;
  noun: string;
  verb: string;
}

interface IProps {
  data: IWidgetCountBySeverityTextDataBase;
  severityFieldNames: ISeverityFieldNames;
  segmentText: string;
  labels: ITextViewLabels;
  isStreet: boolean;
  largeNumbers: boolean;
}

export type IFormattedWidgetCountBySeverity = IWidgetCountBySeverityTextDataBase<ICountBySeverity>;

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
    width: '80%',
    height: '25%',
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

function getSingleType(countBySeverity: ICountBySeverity): string {
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

const TextView: FC<IProps> = ({
  data,
  segmentText,
  severityFieldNames: { fatal: fatalFieldName, severe: severeFieldName, light: lightFieldName, total: totalFieldName },
  labels,
  isStreet,
  largeNumbers,
}) => {
  const classes = useStyles();

  const items: IWidgetCountBySeverityTextDataBase['items'] & any = data?.items || {};

  const countBySeverity = {
    fatal: items[fatalFieldName],
    severe: items[severeFieldName],
    light: items[lightFieldName],
    total: items[totalFieldName],
  };
  const howManySeverities = [!!countBySeverity.fatal, !!countBySeverity.severe, !!countBySeverity.light];
  const isSingleType = howManySeverities.filter(Boolean).length === 1;

  const headerClass = classNames(classes.headerBase, isSingleType ? classes.headerSingleType : classes.headerList);
  return (
    <div className={classes.root}>
      <Box className={headerClass} color={brightGreyColor} textAlign="center">
        <TextViewHeader
          singleType={isSingleType ? getSingleType(countBySeverity) : ''}
          totalCount={countBySeverity.total}
          data={data}
          segmentText={segmentText}
          labels={labels}
          isStreet={isStreet}
        />
      </Box>
      {isSingleType ? (
        <SeverityImage severity={getSingleType(countBySeverity)!} />
      ) : (
        <Box color="text.secondary" className={classes.list}>
          <TextViewList data={countBySeverity} labels={labels} largeNumbers={largeNumbers}/>
        </Box>
      )}
    </div>
  );
};
export default TextView;
