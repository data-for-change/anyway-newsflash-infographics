import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import asyncLoading from 'react-async-loader';

interface ReactStreetviewProps {
  apiKey: string;
  streetViewPanoramaOptions: google.maps.StreetViewPanoramaOptions;
  onPositionChanged: Function;
  onPovChanged: Function;
  position: google.maps.LatLng;
  googleMaps: any;
}

class ReactStreetview extends React.Component<ReactStreetviewProps> {
  private streetView: google.maps.StreetViewPanorama | null;

  constructor(props : ReactStreetviewProps) {
    super(props);
    this.streetView = null;
  }
  initialize(canvas: any) {
    if (this.props.googleMaps && this.streetView == null) {
      this.streetView = new this.props.googleMaps.StreetViewPanorama(canvas, this.props.streetViewPanoramaOptions);

      this.streetView!.addListener('position_changed', () => {
        if (this.props.onPositionChanged) {
          this.props.onPositionChanged(this.streetView!.getPosition());
        }
      });

      this.streetView!.addListener('pov_changed', () => {
        if (this.props.onPovChanged) {
          this.props.onPovChanged(this.streetView!.getPov());
        }
      });
      if (!this.props.streetViewPanoramaOptions.position) {
        this.props.streetViewPanoramaOptions.position = this.props.position;
      }
    }
  }

  componentDidMount() {
    this.initialize(ReactDOM.findDOMNode(this));
  }

  componentDidUpdate() {
    this.initialize(ReactDOM.findDOMNode(this));
  }
  componentWillUnmount() {
    if (this.streetView) {
      this.props.googleMaps.event.clearInstanceListeners(this.streetView);
    }
  }

  render() {
    if (this.streetView) {
      this.streetView.setPosition(this.props.position);
    }
    return (
      <div
        style={{
          height: '100%',
        }}
      ></div>
    );
  }
}

function mapScriptsToProps(props: ReactStreetviewProps) {
  const googleMapsApiKey = props.apiKey;
  return {
    googleMaps: {
      globalPath: 'google.maps',
      url: 'https://maps.googleapis.com/maps/api/js?key=' + googleMapsApiKey,
      jsonp: true,
    },
  };
}

export default asyncLoading(mapScriptsToProps)(ReactStreetview);
