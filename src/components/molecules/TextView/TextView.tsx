import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import { Theme, makeStyles } from '@material-ui/core';
import { shadowColor, silverSmokeColor } from '../../../style';
import Box from '@material-ui/core/Box';
import TextViewList from './TextViewList';
import TextViewHeader from './TextViewHeader';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-evenly',
    letterSpacing: 1,
    padding: `0 ${theme.spacing(6)}px`,
  },
  border: {
    borderBottom: `5px solid ${silverSmokeColor}`,
  },
  image: {
    height: theme.spacing(11),
    width: 'auto',
  },
}));

//return a subset contain the count for each accident severity type - not include total count
const extractCount = ({ severity_fatal_count, severity_light_count, severity_severe_count }: any) => {
  //checking availability of two or more types
  if ([severity_fatal_count, severity_light_count, severity_severe_count].filter(Boolean).length > 2)
    return { severity_fatal_count, severity_light_count, severity_severe_count };
  else {
    return null;
  }
};

const TextView: FC<IProps> = ({ data, segmentText }) => {
  const classes = useStyles();
  const { items } = data;
  const countsData = extractCount(items);
  return (
    <div className={classes.root}>
      <Box color={shadowColor} textAlign="center">
        <TextViewHeader data={data} segmentText={segmentText} />
      </Box>
      <Box color="text.secondary" px={6}>
        {countsData && <TextViewList data={countsData} />}
      </Box>
    </div>
  );
};
export default TextView;
