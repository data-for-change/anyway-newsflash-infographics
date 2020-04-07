import 'leaflet/dist/leaflet.css';
import React, { FunctionComponent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { makeStyles } from '@material-ui/core/styles';
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";

interface IProps {
    marker: { lat: number, lng: number },
    data: HeatMapDataType[]
}

export type HeatMapDataType = {
    accident_type: string
    count: number
}

const INITIAL_ZOOM = 13;

const useStyles = makeStyles({
    wrapper: {
        height: '100%',
        width: '100%'
    },
});

const HeatMap: FunctionComponent<IProps> = ({ marker, data }) => {
    const classes = useStyles();
    return (
        <Map center={marker} zoom={INITIAL_ZOOM} className={classes.wrapper}>
            <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={data}
                longitudeExtractor={(m: any) => m.longitude}
                latitudeExtractor={(m: any) => m.latitude}
                intensityExtractor={(m: any) => parseFloat(m.latitude)}
            />
            <ReactLeafletGoogleLayer googleMapsLoaderConf= {{KEY:'AIzaSyDUIWsBLkvIUwzLHMHos9qFebyJ63hEG2M', VERSION: '3.40.6'}} type='terrain'/>
            <Marker position={marker} />
        </Map>
    );
};

export default HeatMap;
