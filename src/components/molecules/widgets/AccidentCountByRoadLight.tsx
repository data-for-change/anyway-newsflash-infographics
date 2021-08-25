import React, { FC } from 'react';
import { IWidgetAccidentCountByRoadLight } from 'models/WidgetData';

interface IProps {
  data: IWidgetAccidentCountByRoadLight;
  segmentText: string;
}

const AccidentCountByRoadLight: FC<IProps> = () => {
  return <div> {} </div>;
};
export default AccidentCountByRoadLight;
