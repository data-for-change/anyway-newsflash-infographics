import React from 'react';
import Box from '@material-ui/core/Box';
import { roadIconColors, silverSmokeColor } from '../../../style';
import SeverityImage from './SeverityImage';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
  isLast?: boolean;
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    height: '20%',
  },
  acNum: {
    color: roadIconColors.red,
    fontSize: '30px',
    fontWeight: 'bold',
    fontFamily: 'Alef',
  },
}));

const TextViewRecord: React.FC<IProps> = ({ isLast, numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root} py={1} borderBottom={isLast ? '' : `5px solid ${silverSmokeColor}`}>
      <SeverityImage severity={imgSrc} />
      <Box lineHeight={'1.1'} display="flex" flexDirection="column" alignItems="center" justifyContent={'center'}>
        <Box className={classes.acNum}>{numOfAccidents}</Box>
        <Box fontWeight={'normal'} fontSize={'27px'} fontFamily={'Alef'}>
          {severityDesc}
        </Box>
      </Box>
    </Box>
  );
};

export default TextViewRecord;
