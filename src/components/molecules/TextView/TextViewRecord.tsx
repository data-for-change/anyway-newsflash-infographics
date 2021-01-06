import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '../../atoms';
import { roadIconColors, silverSmokeColor } from '../../../style';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
}

const red = roadIconColors.red;

const useStyles = makeStyles((theme) => ({
  image: {
    height: theme.spacing(11),
    width: 'auto',
  },
}));

const TextViewRecord: React.FC<IProps> = ({ numOfAccidents, severityDesc, imgSrc }) => {
  const classes = useStyles();
  return (
    <Box display="flex" py={1} borderBottom={`5px solid ${silverSmokeColor}`}>
      <Box flex={1} display="flex" justifyContent="center">
        <img src={imgSrc} className={classes.image} alt="crutches" />
      </Box>
      <Box flex={1} display="flex" justifyContent="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box color={red}>
            <Typography.Title1>{numOfAccidents}</Typography.Title1>
          </Box>
          <Typography.Title1>{severityDesc}</Typography.Title1>
        </Box>
      </Box>
    </Box>
  );
};

export default TextViewRecord;
