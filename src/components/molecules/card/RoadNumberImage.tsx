import React, { FC } from 'react';
import RoadNumberSvg from 'components/atoms/RoadNumberSvg';
import { roadIconColors as colors } from 'style';

const HIGH_WAY_ROAD_NUMBERS = [1, 2, 4, 5, 6, 9, 16, 20, 22, 50, 70, 77, 431, 471, 531];

const getIconStyle = (roadNumber: number) => {
  let style = { color: colors.black, size: 50 };
  const highWayRoadNumber = HIGH_WAY_ROAD_NUMBERS.includes(roadNumber);
  const numLength: number = roadNumber.toString().length;
  if (highWayRoadNumber) {
    style = { color: colors.blue, size: 80 };
  } else if (numLength <= 2) {
    style = { color: colors.red, size: 80 };
  } else if (numLength === 3) {
    style = { color: colors.green, size: 65 };
  }
  return style;
};

interface IProps {
  roadNumber: number;
}

const RoadNumberImage: FC<IProps> = ({ roadNumber }) => {
  const iconStyle = getIconStyle(roadNumber);
  return roadNumber ? <RoadNumberSvg iconStyle={iconStyle} roadNumber={roadNumber} /> : null;
};

export default RoadNumberImage;
