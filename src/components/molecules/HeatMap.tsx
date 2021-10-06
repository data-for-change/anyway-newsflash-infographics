import { FC } from 'react';
import { IPoint } from 'models/Point';
import 'leaflet.heat';
import HeatMapLayer from 'services/HeatMapLayer';
import Map from './map/Map';

interface IProps {
  data: IPoint[];
}

const HeatMap: FC<IProps> = ({ data }) => {

  return (
    <Map data={data}>
      <HeatMapLayer points={data} />
    </Map>
  );
};

export default HeatMap;
