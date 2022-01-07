import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Typography } from 'components/atoms';
import React from 'react';
import { roadIconColors, silverSmokeColor } from 'style';
import SeverityImage from './SeverityImage';

const PREFIX = 'TextViewRecord';

const classes = {
  root: `${PREFIX}-root`,
  text: `${PREFIX}-text`,
  acNum: `${PREFIX}-acNum`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '80%',
    height: '20%',
  },

  [`& .${classes.text}`]: {
    position: 'relative',
    top: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    lineHeight: 0.5,
    justifyContent: 'center',
  },

  [`& .${classes.acNum}`]: {
    color: roadIconColors.red,
    fontWeight: 'bold',
    fontSize: '200%',
  },
}));

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
  isLast?: boolean;
}

const TextViewRecord: React.FC<IProps> = ({ isLast, numOfAccidents, severityDesc, imgSrc }) => {
  return (
    <StyledBox className={classes.root} py={1} borderBottom={isLast ? '' : `5px solid ${silverSmokeColor}`}>
      <SeverityImage inRecord severity={imgSrc} />
      <Box className={classes.text}>
        <Box className={classes.acNum}>{numOfAccidents}</Box>
        <Typography.Title1>{severityDesc}</Typography.Title1>
      </Box>
    </StyledBox>
  );
};

export default TextViewRecord;
