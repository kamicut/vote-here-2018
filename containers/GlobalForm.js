import {h, Component} from 'preact';
import Form from '../components/GlobalForm.js';
import countriesData from '../data/countries.json';
import locationsData from '../data/polling_station_locations.json';
import labels from '../i18n.json';

export default class GlobalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      locations: []
    }
  }

  setCountry(e) {
    let countryId = +e.target.value;
    let data = countriesData[countryId];
    let districtId = null;

    // get the unique districts for the select
    let districts = data.polling_stations.reduce((arr, station) => {
      arr = arr.concat(station.districts_ids || []);
      return arr;
    }, []);

    // Remove district 0
    districts = districts.filter(d => d !== 0);

    districts = [...new Set(districts)];

    if (districts.length == 0) {
      // Add district 0 - All districts
      districts.push(0);
      districtId = districts[0];
    }

    this.setState({ countryId, districts, locations: [] });
    this.setDistrict({ target: { value: districtId }});
  }

  setDistrict(e) {
    let districtId = e.target.value;
    if (districtId == null) {
      this.setState({ districtId });
      return;
    }
    districtId = +districtId;
    let country = countriesData[this.state.countryId];
    let locationId = null;
    let locations = country.polling_stations.reduce((arr, station) => {
      if (station.districts_ids.indexOf(+districtId) !== -1 || station.districts_ids.indexOf(0) !== -1) {
        arr.push(station.location_id);
      }
      return arr;
    }, []);

    locations = [...new Set(locations)];

    if (locations && locations.length === 1) {
      locationId = locations[0];
    }

    this.setState({ locations, districtId });
    this.setLocation({ target: { value: locationId }});
  }

  setLocation(e) {
    let locationId = e.target.value;
    if (locationId == null) {
      this.setState({ location: null, locationId });
      return;
    }
    locationId = +locationId;

    this.setState({ locationId });
  }

  returnToForm() {
    this.setState({ selected: false });
  }

  submitForm() {
    let location = locationsData[this.state.locationId];

    let kalam = countriesData[this.state.countryId].polling_stations
      .find(station => station.location_id === this.state.locationId &&
        (station.districts_ids.indexOf(+this.state.districtId) !== -1 || station.districts_ids.indexOf(0) !== -1)
      )
      .kalam

    this.setState({
      location,
      center: location.coordinates,
      kalam,
      selected: true
    }, () => this.props.setCoordinates(location.coordinates));
  }

  render ({lang}, state) {
    return h('div',
      {},
      (state.selected
        ? h('div', {
          id: 'form'
        },
          (state.lang === 'ar'
            ? h('h2', {}, state.location.name_ar)
            : h('h2', {}, state.location.name_en)),
          h('h3', {}, state.location.address),
          h('h3', {}, labels[lang].labels.kalam + ' ' + state.kalam),
          h('a', {
            href: state.location.google_maps_links,
            target: '_blank',
            style: { 'font-size': '18px' }
          },
            labels[lang].labels.google_directions
          ),
          h('br'),
          h('input', {
            type: 'submit',
            value: 'back',
            onClick: this.returnToForm.bind(this)
          })
        )
        : h(Form, {
          class: (state.selected ? 'hide-form' : ''),
          countryId: state.countryId,
          districtId: state.districtId,
          locationId: state.locationId,
          districts: state.districts,
          locations: state.locations,
          lang: lang,
          actions: {
            changeCountry: this.setCountry.bind(this),
            changeDistrict: this.setDistrict.bind(this),
            changeLocation: this.setLocation.bind(this),
            submit: this.submitForm.bind(this)
          }
        })
      )
    )
  }
}
