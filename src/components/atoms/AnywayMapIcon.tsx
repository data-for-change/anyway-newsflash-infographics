import L from 'leaflet';

const AnywayMapIcon = ( image: string, iconSize: any, shadow?: string ) => {
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