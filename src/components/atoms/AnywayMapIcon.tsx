import L from 'leaflet';

const L_ICON_SIZE = { iconSize: [25, 25], iconAnchor: [10,15], popupAnchor: [0, -4], shadowSize: [41, 41] };
const iconSize = L_ICON_SIZE;

const AnywayMapIcon = (image: string, shadow?:string) => {
    const icon = new L.Icon({
      iconUrl: image,
      shadowUrl: shadow,
      iconSize: L.point(iconSize.iconSize[0], iconSize.iconSize[1]),
      iconAnchor: L.point(iconSize.iconAnchor[0], iconSize.iconAnchor[1]),
      popupAnchor: L.point(iconSize.popupAnchor[0], iconSize.popupAnchor[1]),
      shadowSize: L.point(iconSize.shadowSize[0], iconSize.shadowSize[1]),
    });
    return icon;
};
export default AnywayMapIcon;