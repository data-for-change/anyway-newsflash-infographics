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
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    height: '20%',
    py: 1,
    borderBottom: '5px solid',
    borderBlockColor: silverSmokeColor,
    '&:last-child': {
      borderBottom: '0px',
    },
  },
  text: {
    top: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  acNum: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    color: roadIconColors.red,
    width: '30%',
  },
}));

const TextViewRecordLargeNumbers: React.FC<IProps> = ({ numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <SeverityImage inRecord severity={imgSrc} />
      <Box className={classes.acNum}>
        <Typography.TextBody1>{numOfAccidents}</Typography.TextBody1>
      </Box>
      <Box className={classes.text}>
        <Typography.Title1>{severityDesc}</Typography.Title1>
      </Box>
    </Box>
  );
};

export default TextViewRecordLargeNumbers;
