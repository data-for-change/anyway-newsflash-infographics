import React from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '../../atoms';
import { roadIconColors, silverSmokeColor } from '../../../style';
import SeverityImage from './SeverityImage';

interface IProps {
  numOfAccidents: number;
  severityDesc: string;
  imgSrc: string;
}

const red = roadIconColors.red;

const TextViewRecord: React.FC<IProps> = ({ numOfAccidents, severityDesc, imgSrc }) => {
  return (
    <Box display="flex" py={1} borderBottom={`5px solid ${silverSmokeColor}`}>
      <SeverityImage severity={imgSrc} />
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
