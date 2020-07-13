import React, { FC } from 'react';
import RoadNumberSvg from '../components/atoms/RoadNumberSvg';
import { roadIconColors as colors } from '../style';

interface IProps {
  roadNumber: number;
}
const HIGH_WAY_ROAD_NUMBERS = [1, 2, 4, 5, 6, 9, 16, 20, 22, 50, 70, 77, 431, 471, 531];
const getColor = (roadNumber: number) => {
  let color;
  const highWayRoadNumber = HIGH_WAY_ROAD_NUMBERS.includes(roadNumber);
  const numLength = roadNumber.toString().length;

  if (highWayRoadNumber) color = colors.blue;
  if (numLength === 1 || 2) color = colors.red;
  else if (numLength === 3) color = colors.green;
  else color = colors.black;
  return color;
};
const RoadNumberImage: FC<IProps> = ({ roadNumber }) => {
  const roadColor = getColor(roadNumber);
  return roadNumber ? <RoadNumberSvg roadColor={roadColor} roadNumber={roadNumber} /> : null;
};
export default RoadNumberImage;
