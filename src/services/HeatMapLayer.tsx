import { useMap } from 'react-leaflet';
import L, { LatLng } from 'leaflet';
import 'leaflet.heat';
import { useEffect } from 'react';
import { IPoint } from 'models/Point';

const HEATMAP_OPTIONS = {
  minOpacity: 0.3,
  maxZoom: 18,
  max: 1.0,
  radius: 25,
  blur: 15,
  gradient: { 0.5: 'blue', 1: 'lime', 0.2: 'red' },
};

interface IProps {
  points: IPoint[];
}
const HeatMapLayer: React.FC<IProps> = ({ points }) => {
  const map: L.Map = useMap();
  useEffect(() => {
    if (map) {
      const letlanPoints = points.map((p) => {
        return new LatLng(p.latitude, p.longitude); // lat lng intensity
      });
      L.heatLayer(letlanPoints, HEATMAP_OPTIONS).addTo(map);
    }
  }, [map, points]);
  return null;
};

export default HeatMapLayer;
