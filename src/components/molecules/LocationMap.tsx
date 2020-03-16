import 'leaflet-css'
import React, { FunctionComponent } from 'react'
import L from 'leaflet'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'

// TODO: Move to init.service once it's merged.
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

interface IProps {
    data: any[],
    marker: { lat: number; lng: number }
}

const INITIAL_ZOOM = 13
const WRAPPER_STYLES = { height: '100%', width: '100%' }

const LocationMap: FunctionComponent<IProps> = ({ data, marker }) => {
    return (
        <Map center={marker} zoom={INITIAL_ZOOM} style={WRAPPER_STYLES}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {data.map((x: any) => {
                if (x.latitude !== null && x.longitude !== null) {
                    let lPoint: L.LatLng = new L.LatLng(x.latitude, x.longitude);
                    return (<Marker key={`marker-${x.accident_timestamp}`} position={lPoint} >
                        {<Popup>
                            <div >
                                <div>{x.accident_timestamp}, {x.accident_severity}</div>
                            </div>
                        </Popup>}
                    </Marker>)
                }
            })}
        </Map>
    )
}

export default LocationMap
