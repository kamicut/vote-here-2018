import 'whatwg-fetch';

import {h, render, Component} from 'preact';
import MapboxMap from './components/MapboxMap.js';
import Form from './components/form.js';

const countriesData = require('./data/countries.json');
const locationsData = require('./data/polling_station_locations.json');
const labels = require('./i18n.json');

/**
 * Checks if the entered values exist in the index
 * @param {Object} index
 * @param {Object} entry
 * @returns {Object[]} list of matching polling stations
 */
function checkInIndex(index, entry) {
  let { sect, subdistrict, gender, val } = entry;
  var fromIndex = index[sect][subdistrict][gender];
  return fromIndex.filter((row) => {
    return Number(row.from) <= Number(val) &&
      Number(val) <= Number(row.to);
  });
}

class App extends Component {
  getInitialState() {
    return {
      center: null,
      error: '',
      selected: false,
      lang: 'ar',
      locations: []
    };
  }

  returnToForm() {
    this.setState({selected: false});
  }

  setLang(lang) {
    this.setState({lang: lang});
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

    districts = [...new Set(districts)];

    if (districts && districts.length === 1) {
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

  submitForm() {
    let location = locationsData[this.state.locationId];
    let kalam = countriesData[this.state.countryId].polling_stations
      .find(station => station.location_id === this.state.locationId && station.districts_ids.indexOf(+this.state.districtId) !== -1)
      .kalam

    this.setState({
      location,
      center: location.coordinates,
      kalam,
      selected: true
    });
  }

  render(props, state) {
    return h(
      'div', {id: 'app'},
      h(MapboxMap, {center: state.center, id: (state.location && state.location.id) || 0}),
      h('div', {id: 'main', class: (state.lang === 'ar'?'':'override')},
        h('header',
          {id: 'lang-selector'},
          h('a', {
            class: 'lang-btn' + (state.lang === 'ar'? ' lang-btn-bold':''),
            onClick: this.setLang.bind(this, 'ar')
          }, 'AR'),
          ' | ',
          h('a', {
            class: 'lang-btn' + (state.lang === 'en'? ' lang-btn-bold':''),
            onClick: this.setLang.bind(this, 'en')
          }, 'EN')
         ),
        (state.selected
          ? h('div', {
            id: 'form'
          },
              (state.lang=== 'ar'
               ? h('p', {}, state.location.name_ar)
               : h('p', {}, state.location.name_en)),
              h('div', {}, labels[state.lang].labels.kalam + ' ' + state.kalam),
              h('a', {
                href: state.location.google_maps_link,
                target: '_blank'
              },
                labels[state.lang].labels.google_directions
               ),
              h('br'),
              h('input', {
                type: 'submit',
                value: 'back',
                onClick: this.returnToForm.bind(this)
              })
             )
        : h(Form, {
          class: (state.selected? 'hide-form':''),
          countryId: state.countryId,
          districtId: state.districtId,
          locationId: state.locationId,
          districts: state.districts,
          locations: state.locations,
          lang: state.lang,
          actions: {
            changeCountry: this.setCountry.bind(this),
            changeDistrict: this.setDistrict.bind(this),
            changeLocation: this.setLocation.bind(this),
            submit: this.submitForm.bind(this)
          }
        })),
        h('div', {id: 'errors'}, state.error),
        h('hr'),
        h('footer', {},
          h('div', {}, labels[state.lang].about.problems),
          h('span', {}, labels[state.lang].about.blurb1 + " "),
          h('a', {'href': "http://beirutmadinati.com", "target": "_blank"}, labels[state.lang].about.bm),
          h('span', {}, ". " + labels[state.lang].about.blurb2 + " "),
          h('a', {'href': "https://github.com/kamicut/vote-here-2016", "target": "_blank"}, labels[state.lang].about.link)
        )
       )
    );
  }
}

render(h(App), document.body);
