import accidentIcon from '../../assets/accident_icon.png';
import AnyWayMapIcon from './AnywayMapIcon';
import redIcon from '../../assets/marker-icon-2x-red.png';
import orangeIcon from '../../assets/marker-icon-2x-orange.png';
import yellowIcon from '../../assets/marker-icon-2x-yellow.png';
import shadowIcon from '../../assets/marker-shadow.png';


const accidentMarker = () => AnyWayMapIcon( accidentIcon );
const redMarker = () => AnyWayMapIcon(redIcon, shadowIcon);
const orangeMarker = () => AnyWayMapIcon(orangeIcon, shadowIcon);
const yellowMarker = () => AnyWayMapIcon( yellowIcon, shadowIcon );

const MapIcon = {
    accidentMarker,
    redMarker,
    orangeMarker,
    yellowMarker
};

export default MapIcon;