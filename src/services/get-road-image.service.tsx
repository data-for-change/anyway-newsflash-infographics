import React, { FC } from 'react';
import RoadNumberSvg from '../components/atoms/RoadNumberSvg';
import { roadIconColors as colors } from '../style';

interface IProps {
  roadNumber: number;
}

const getRoadColor = (roadNumber: number) => {
  let numLength = roadNumber.toString().length;
  let color;
  switch (numLength) {
    case 1: {
      color = colors.blue;
      break;
    }
    case 2: {
      color = colors.red;
      break;
    }
    case 3: {
      color = colors.green;
      break;
    }
    case 4: {
      color = colors.brown;
      break;
    }
    default:
      color = colors.red;
  }
  return color;
};
const RoadNumberImage: FC<IProps> = ({ roadNumber }) => {
  const roadColor = getRoadColor(roadNumber);
  return <RoadNumberSvg roadColor={roadColor} roadNumber={roadNumber} />;
};
export default RoadNumberImage;
