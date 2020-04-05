import 'leaflet-css';
import React, { FunctionComponent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { toJS } from "mobx";

// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { makeStyles } from '@material-ui/core/styles';
import { IWidgetAccidentsHeatMap } from "../../models/WidgetData";
interface IProps {
    data: IWidgetAccidentsHeatMap[]
}
const INITIAL_ZOOM = 13;
const useStyles = makeStyles({
    wrapper: {
        height: '100%',
        width: '100%'
    },
} );

const HeatMap: FunctionComponent<IProps> = ( props ) => {
    const position: any = { lat: 32.0853, lng: 34.7818 };
    const classes = useStyles();

    return (
      <Map center={position} zoom={INITIAL_ZOOM} className={classes.wrapper}>
        <HeatmapLayer
          fitBoundsOnLoad
          fitBoundsOnUpdate
          points={props.data}
          longitudeExtractor={(m: any) => m.longitude}
          latitudeExtractor={(m: any) => m.latitude}
          intensityExtractor={(m: any) => parseFloat(m.latitude)}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={position} /> */}
      </Map>
    );
};

export default HeatMap;
