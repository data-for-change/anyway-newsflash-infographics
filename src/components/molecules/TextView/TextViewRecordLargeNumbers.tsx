import React from 'react';
import Box from '@material-ui/core/Box';
import { roadIconColors, silverSmokeColor } from 'style';
import SeverityImage from './SeverityImage';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from 'components/atoms';

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
  isLast?: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    top: theme.spacing(2),
    justifyContent: 'space-around',
    width: '80%',
    height: '20%',
  },
  text: {
    position: 'relative',
    top: theme.spacing(0.2),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: 110,
  },
  acNum: {
    position: 'relative',
    top: theme.spacing(0.2),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: roadIconColors.red,
    fontWeight: 'bold',
    fontSize: '350%',
    width: 110,
  },
}));

const TextViewRecord: React.FC<IProps> = ({ isLast, numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} py={1} borderBottom={isLast ? '' : `5px solid ${silverSmokeColor}`}>
      <SeverityImage inRecord severity={imgSrc} />
      <Box className={classes.acNum}>{numOfAccidents}</Box>
      <Box className={classes.text}>
        <Typography.Title1>{severityDesc}</Typography.Title1>
      </Box>
    </Box>
  );
};

export default TextViewRecord;
