import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import { Theme, makeStyles } from '@material-ui/core';
import { shadowColor } from '../../../style';
import Box from '@material-ui/core/Box';
import TextViewList from './TextViewList';
import TextViewHeader from './TextViewHeader';
import SeverityImage from './SeverityImage';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    letterSpacing: 1,
    padding: theme.spacing(0,6)
  },
  header: {
    width:'82.51%',
    height:'20.76%',
    marginRight: '5%',
    padding: '0 0 0 9.8%',
  },
  list :{
    width: '130%'
  }

}));

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
  // e.g. if there are only accidents types of severity_fatal_count will return the strinf "fatal"
  const findSingleType = () => {
    if (!countsData) {
      for (const [key, value] of Object.entries(items)) {
        if (key.split('_')[0] === 'severity') {
          if (!value) {
            return;
          } else {
            return key.split('_')[1];
          }
        }
      }
    }
  };

  const singleType: string | undefined = findSingleType();

  return (
    <div className={classes.root}>
      <Box className={classes.header} color={shadowColor} textAlign="center">
        <TextViewHeader  singleType={singleType} data={data} segmentText={segmentText} />
      </Box>
      <Box color="text.secondary" px={6}>
        {countsData ? (
          <Box  className={classes.list}>
          <TextViewList data={countsData} />
          </Box>

        ) : (
          singleType && <SeverityImage severity={singleType as string} />
        )}
      </Box>
    </div>
  );
};
export default TextView;
