import L from 'leaflet';
import standardYellowIcon from 'assets/map/standard-yellow-marker.png';
import standardOrangeIcon from 'assets/map/standard-orange-marker.png';
import standardRedIcon from 'assets/map/standard-red-marker.png';

import carYellowIcon from 'assets/map/car-yellow-marker.png';
import carOrangeIcon from 'assets/map/car-orange-marker.png';
import carRedIcon from 'assets/map/car-red-marker.png';
import shadowIcon from 'assets/map/marker-shadow.png';
import { IconTypes, SeverityTypes } from 'models/Map';

const STANDARD_ICON_SIZE = { iconSize: [25, 41], iconAnchor: [17, 46], popupAnchor: [1, -34], shadowSize: [41, 41] };
const CAR_ICON_SIZE = { iconSize: [30, 30], iconAnchor: [10, 15], popupAnchor: [0, -4], shadowSize: [41, 41] };

const createLeafletIcon = (image: string, iconSize: any, shadow?: string) => {
  const icon = new L.Icon({
    iconUrl: image,
    shadowUrl: shadow,
    iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
    // point of the icon which will correspond to marker's location
    iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
    popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
    shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
  });
  return icon;
};

const MapIcon = {
  standardIcon: {
    yellow: createLeafletIcon(standardYellowIcon, STANDARD_ICON_SIZE, shadowIcon),
    orange: createLeafletIcon(standardOrangeIcon, STANDARD_ICON_SIZE, shadowIcon),
    red: createLeafletIcon(standardRedIcon, STANDARD_ICON_SIZE, shadowIcon),
  },
  carIcon: {
    yellow: createLeafletIcon(carYellowIcon, CAR_ICON_SIZE),
    orange: createLeafletIcon(carOrangeIcon, CAR_ICON_SIZE),
    red: createLeafletIcon(carRedIcon, CAR_ICON_SIZE),
  },
  getIconBySeverity: (type: IconTypes, severity: SeverityTypes) => {
    switch (severity) {
      case 'light':
        return MapIcon[type].yellow;
      case 'severe':
        return MapIcon[type].orange;
      case 'fatal':
        return MapIcon[type].red;
      default:
        return MapIcon[type].red;
    }
  },
};

export default MapIcon;
