import React from 'react';
import { getAPIKey } from '../../utils/utils';
import ReactStreetview from 'react-streetview';
import { IPoint } from '../../models/Point';

interface IProps {
  data: IPoint[];
}

class StreetViewWidget extends React.Component<IProps> {
  position = this.props;

  render() {
    // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions
    const streetViewPanoramaOptions = {
      position: this.position.data,
      pov: { heading: 100, pitch: 0 },
      zoom: 1,
    };
    const style = {
      width: '100%',
      height: '100%',
      backgroundColor: '#eeeeee',
    };

    return (
      <div style={style}>
        <ReactStreetview apiKey={getAPIKey()} streetViewPanoramaOptions={streetViewPanoramaOptions} />
      </div>
    );
  }
}

export default StreetViewWidget;
