import React, { FC } from 'react';
import { IWidgetTopRoadSegmentsAccidentsPerKm } from '../../../models/WidgetData';

const ROAD_NUM_ACCIDENTS = 'road_num_accidents';
const ROAD_LENGTH = 'road_length';

interface IProps {
  data: IWidgetTopRoadSegmentsAccidentsPerKm;
  segmentText: string;
}

const TopRoadSegmentsAccidentsPerKm: FC<IProps> = () => {
  return <div> {} </div>;
};
export default TopRoadSegmentsAccidentsPerKm;
