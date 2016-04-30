import {h, Component} from 'preact';

export default class MapboxMap extends Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FtaWN1dCIsImEiOiJMVzF2NThZIn0.WO0ArcIIzYVioen3HpfugQ';
    var mapCenter = this.props.center || [35.478866,33.894518];
    this.map = new mapboxgl.Map({
      container: this._map,
      style: 'mapbox://styles/kamicut/cinm462nw001nbom6nnwz899p', //stylesheet location
      center: mapCenter,
      zoom: 13.5 // starting zoom
    });

    // Force a rerender
    setTimeout(() => this.map.resize(), 0);
  }

  componentWillReceiveProps(nextProps) {
    // In case the first time
    if (nextProps.center) {
      this.map.flyTo({center: nextProps.center, zoom: 16});
      this.center = nextProps.center;
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return h('div', {
      id: 'map',
      style: 'position:absolute; top:0; bottom:0; width:100%; z-index: -1',
      ref: (m) => this._map = m});
  }
}
