import accidentIcon from '../../assets/accident_icon.png';
import AnyWayMapIcon from './AnywayMapIcon';
import redIcon from '../../assets/marker-icon-2x-red.png';
import orangeIcon from '../../assets/marker-icon-2x-orange.png';
import yellowIcon from '../../assets/marker-icon-2x-yellow.png';
import shadowIcon from '../../assets/marker-shadow.png';

const ACCIDENT_ICON_SIZE = { iconSize: [25, 25], iconAnchor: [10, 15], popupAnchor: [0, -4], shadowSize: [41, 41] };
const L_ICON_SIZE = { iconSize: [25, 41], iconAnchor: [0, 0], popupAnchor: [1, -34], shadowSize: [41, 41] };

const accidentMarker = () => AnyWayMapIcon(accidentIcon, ACCIDENT_ICON_SIZE);
const redMarker = () => AnyWayMapIcon(redIcon, L_ICON_SIZE, shadowIcon);
const orangeMarker = () => AnyWayMapIcon(orangeIcon, L_ICON_SIZE, shadowIcon);
const yellowMarker = () => AnyWayMapIcon( yellowIcon, L_ICON_SIZE, shadowIcon );

const MapIcon = {
    accidentMarker,
    redMarker,
    orangeMarker,
    yellowMarker
};

export default MapIcon;