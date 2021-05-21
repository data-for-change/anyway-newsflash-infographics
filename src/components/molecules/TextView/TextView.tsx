import React, { FC, useCallback } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import { Theme, makeStyles } from '@material-ui/core';
import { brightGreyColor } from '../../../style';
import Box from '@material-ui/core/Box';
import classNames from 'classnames';
import TextViewList from './TextViewList';
import TextViewHeader from './TextViewHeader';
import SeverityImage from './SeverityImage';
import { severityNameMap } from '../../../services/widgets.style.service';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}

export interface CountBySeverity {
  fatal: number;
  severe: number;
  light: number;
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

function getSingleType(countBySeverity: CountBySeverity) {
  if (countBySeverity.fatal) {
    return 'fatal';
  }
  if (countBySeverity.severe) {
    return 'sever';
  }
  if (countBySeverity.light) {
    return 'light';
  }
}

// const getCountsForView = ({
//   items: { severity_fatal_count, severity_light_count, severity_severe_count },
// }: IWidgetCountBySeverityTextData) => {
//   const countsForDesc = Object.entries({
//     severity_fatal_count,
//     severity_light_count,
//     severity_severe_count,
//   }).filter((type) => Boolean(type[1]));
//   return Object.fromEntries(countsForDesc);
// };

const TextView: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyles();
  //extract counts by severity type fields
  // const dataForView = getCountsForView(data);

  const countBySeverity: CountBySeverity = {
    fatal: data?.items.severity_fatal_count || 0,
    severe: data?.items.severity_severe_count || 0,
    light: data?.items.severity_light_count || 0,
  };
  const howManySeverities = [!!countBySeverity.fatal, !!countBySeverity.severe, !!countBySeverity.light];
  const isMultiType = Object.entries(countBySeverity).filter(Boolean).length > 1;

  const findSingleType = useCallback(() => {
    const countsTypes = Object.keys(dataForView);
    return countsTypes.length === 1 ? countsTypes[0] : undefined;
  }, []);

  const singleType: string | undefined = severityNameMap.get(findSingleType());
  const headerClass = classNames(classes.headerBase, singleType ? classes.headerSingleType : classes.headerList);
  return (
    <div className={classes.root}>
      <Box className={headerClass} color={brightGreyColor} textAlign="center">
        <TextViewHeader singleType={singleType} data={data} segmentText={segmentText} />
      </Box>
      {singleType ? (
        <SeverityImage severity={singleType!} />
      ) : (
        <Box color="text.secondary" className={classes.list}>
          <TextViewList data={dataForView} />
        </Box>
      )}
    </div>
  );
};
export default TextView;
