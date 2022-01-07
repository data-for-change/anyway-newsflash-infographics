import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import classNames from 'classnames';
import { IWidgetCountBySeverityTextData } from 'models/WidgetData';
import React, { FC } from 'react';
import { brightGreyColor } from 'style';
import SeverityImage from './SeverityImage';
import TextViewHeader from './TextViewHeader';
import TextViewList from './TextViewList';

const PREFIX = 'TextView';

const classes = {
  root: `${PREFIX}-root`,
  headerBase: `${PREFIX}-headerBase`,
  list: `${PREFIX}-list`,
  singleTypeImage: `${PREFIX}-singleTypeImage`,
  headerSingleType: `${PREFIX}-headerSingleType`,
  headerList: `${PREFIX}-headerList`,
};

const Root = styled('div')(() => ({
  [`&.${classes.root}`]: {
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

  [`& .${classes.headerBase}`]: {
    width: '70%',
    height: '20%',
  },

  [`& .${classes.list}`]: {
    width: '80%',
    height: '100%',
    alignSelf: 'flex-end',
  },

  [`& .${classes.singleTypeImage}`]: {
    height: '40%',
    width: 'auto',
  },

  [`& .${classes.headerSingleType}`]: {
    position: 'relative',
    bottom: '20%',
  },

  [`& .${classes.headerList}`]: {
    alignSelf: 'center',
  },
}));

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}

export interface CountBySeverity {
  fatal: number;
  severe: number;
  light: number;
}

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
  const countBySeverity: CountBySeverity = {
    fatal: data?.items.severity_fatal_count,
    severe: data?.items.severity_severe_count,
    light: data?.items.severity_light_count,
  };
  const howManySeverities = [!!countBySeverity.fatal, !!countBySeverity.severe, !!countBySeverity.light];
  const isSingleType = howManySeverities.filter(Boolean).length === 1;

  const headerClass = classNames(classes.headerBase, isSingleType ? classes.headerSingleType : classes.headerList);
  return (
    <Root className={classes.root}>
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
    </Root>
  );
};
export default TextView;
