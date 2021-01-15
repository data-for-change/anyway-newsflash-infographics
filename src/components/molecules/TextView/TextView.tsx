import React, { FC } from 'react';
import { IWidgetCountBySeverityTextData } from '../../../models/WidgetData';
import { Theme, makeStyles } from '@material-ui/core';
import { shadowColor, silverSmokeColor } from '../../../style';
import Box from '@material-ui/core/Box';
import TextViewList from './TextViewList';
import TextViewHeader from './TextViewHeader';
import Person from '../../../assets/Person.png';
import Ambulance from '../../../assets/Ambulance.png';
import Crutches from '../../../assets/Crutches.png';

interface IProps {
  data: IWidgetCountBySeverityTextData;
  segmentText: string;
}
interface SProps {
  severity: string;
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

const extractCount = ({ severity_fatal_count, severity_light_count, severity_severe_count }: any) => {
  //checking availability of two or more types
  if ([severity_fatal_count, severity_light_count, severity_severe_count].filter(Boolean).length > 2)
    return { severity_fatal_count, severity_light_count, severity_severe_count };
  else {
    return null;
  }
};

const SeverityImage: FC<SProps> = ({ severity }) => {
  const classes = useStyles();
  interface SeverityTypesImages {
    [index: string]: string;
  }
  const imgBySeverity: SeverityTypesImages = { fatal: Person, severe: Ambulance, light: Crutches };
  return (
    <Box flex={1} display="flex" justifyContent="center">
      <img src={imgBySeverity[severity]} className={classes.image} alt={imgBySeverity[severity]} />
    </Box>
  );
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
      <Box color={shadowColor} textAlign="center">
        <TextViewHeader singleType={singleType} data={data} segmentText={segmentText} />
      </Box>
      <Box color="text.secondary" px={6}>
        {countsData ? <TextViewList data={countsData} /> : <SeverityImage severity={singleType as string} />}
      </Box>
    </div>
  );
};
export default TextView;
