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
    justifyContent: 'space-around',
    width: '80%',
    height: '20%',
    py: 1,
  },
  text: {
    position: 'relative',
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 0.5,
    justifyContent: 'center',
    width: '50%',
  },
  acNum: {
    color: roadIconColors.red,
    fontWeight: 'bold',
    fontSize: '200%',
  },
}));

const TextViewRecord: React.FC<IProps> = ({ isLast, numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} borderBottom={isLast ? '' : `5px solid ${silverSmokeColor}`}>
      <SeverityImage inRecord severity={imgSrc} />
      <Box className={classes.text}>
        <Box className={classes.acNum}>{numOfAccidents}</Box>
        <Typography.Title1>{severityDesc}</Typography.Title1>
      </Box>
    </Box>
  );
};

export default TextViewRecord;
