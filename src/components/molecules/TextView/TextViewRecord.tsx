import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '../../atoms';
import { roadIconColors, silverSmokeColor } from '../../../style';
import SeverityImage from './SeverityImage';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
  isLast? : boolean
}

const useStyles = makeStyles(()=> ({
  root:{
    display : 'flex',
    justifyContent : 'space-around',
    width: '90%'
  },
  acNum :{
    color : roadIconColors.red,
    fontSize: '30px',
    fontWeight : 'bold',
    fontFamily : 'Alef'

  }
}));

const TextViewRecord: React.FC<IProps> = ({isLast, numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} py={0.8} borderBottom={isLast ? '':`5px solid ${silverSmokeColor}`}>
      <SeverityImage severity={imgSrc} />
        <Box display="flex" flexDirection="column" alignItems="center"  justifyContent={'center'}>
            <Box className={classes.acNum}>{numOfAccidents}</Box>
          <Typography.Title1 >{severityDesc}</Typography.Title1>
        </Box>
    </Box>
  );
};

export default TextViewRecord;
