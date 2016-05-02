import {h, Component} from 'preact';

export default class MapboxMap extends Component {
  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia2FtaWN1dCIsImEiOiJMVzF2NThZIn0.WO0ArcIIzYVioen3HpfugQ';
    var mapCenter = this.props.center || [35.507126,33.883812];
    this.map = new mapboxgl.Map({
      container: this._map,
      // style: 'mapbox://styles/kamicut/cinm462nw001nbom6nnwz899p', //stylesheet location
      style: 'mapbox://styles/kamicut/cinort42e0044btm4ni0q4t5t',
      center: mapCenter,
      maxBounds: [[35.445671,33.860010],[35.550556,33.920144]],
      zoom: 12.5 // starting zoom
    });

    // Force a rerender
    setTimeout(() => this.map.resize(), 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.center) {
      this.map.flyTo({center: nextProps.center, zoom: 17});
      this.center = nextProps.center;
      this.map.setFilter('pollingstations', ['==', 'ID', nextProps.id]);
      this.map.setPaintProperty('pollingstations', 'circle-opacity', 1);
      this.map.setFilter('station_numbers', ['==', 'ID', nextProps.id]);
      this.map.setPaintProperty('station_numbers', 'text-opacity', 1);
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
