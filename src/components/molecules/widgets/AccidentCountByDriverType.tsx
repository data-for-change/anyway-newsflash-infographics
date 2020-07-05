import React, { FC } from 'react';
import { IWidgetAccidentCountByDriverType } from '../../../models/WidgetData';

interface IProps {
  data: IWidgetAccidentCountByDriverType;
  segmentText: string;
}

const AccidentCountByDriverType: FC<IProps> = () => {
  return <div> {} </div>;
};
export default AccidentCountByDriverType;
