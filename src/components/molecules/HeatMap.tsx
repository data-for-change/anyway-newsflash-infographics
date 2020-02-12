import 'leaflet-css';
import React, { FunctionComponent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
// @ts-ignore
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import { makeStyles } from '@material-ui/core/styles';

// export const geojson = {
//     data: [
//         {
//             "longitude": 34.9780568296871,
//             "latitude": 32.4543458814189,
//             "accident_severity": "קשה",
//             "accident_timestamp": "2016-05-15 21:00:00"
//         },
//         {
//             "longitude": 34.9618510776681,
//             "latitude": 32.4494011939289,
//             "accident_severity": "קשה",
//             "accident_timestamp": "2015-01-02 06:45:00"
//         },
//         {
//             "longitude": 34.968629300414,
//             "latitude": 32.4520110942299,
//             "accident_severity": "קשה",
//             "accident_timestamp": "2014-09-12 09:45:00"
//         },
//         {
//             "longitude": 34.9618510776681,
//             "latitude": 32.4494011939289,
//             "accident_severity": "קשה",
//             "accident_timestamp": "2014-07-27 21:00:00"
//         },
//         {
//             "longitude": 34.9865860704716,
//             "latitude": 32.458914735012,
//             "accident_severity": "קשה",
//             "accident_timestamp": "2011-03-26 19:30:00"
//         },
//         {
//             "longitude": 34.9865860704716,
//             "latitude": 32.458914735012,
//             "accident_severity": "קלה",
//             "accident_timestamp": "2019-11-28 11:30:00"
//         },
//         {
//             "longitude": 34.9618510776681,
//             "latitude": 32.4494011939289,
//             "accident_severity": "קלה",
//             "accident_timestamp": "2019-10-31 19:45:00"
//         },
//         {
//             "longitude": 34.9625415910224,
//             "latitude": 32.4496820631224,
//             "accident_severity": "קלה",
//             "accident_timestamp": "2019-10-31 06:30:00"
//         },
//         {
//             "longitude": 34.9865860704716,
//             "latitude": 32.458914735012,
//             "accident_severity": "קלה",
//             "accident_timestamp": "2019-10-28 10:30:00"
//         },
//         {
//             "longitude": 34.9618510776681,
//             "latitude": 32.4494011939289,
//             "accident_severity": "קלה",
//             "accident_timestamp": "2019-06-22 12:00:00"
//         }
//     ],
// };

interface IProps {
    marker: { lat: number, lng: number },
    data: HeatMapDataType[]
}

export type HeatMapDataType = any;
//  {
//     accident_type: string
//     count: number
// }

const INITIAL_ZOOM = 13;

const useStyles = makeStyles({
    wrapper: {
        height: '100%',
        width: '100%'
    },
});

const LocationMap: FunctionComponent<IProps> = ({ marker, data }) => {
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
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={marker} />
        </Map>
    );
};

export default LocationMap;
