import 'whatwg-fetch';

import {h, render, Component} from 'preact';
import SectPicker from './components/SectPicker.js';
import {getDistrictKey, districtArToEn} from './components/DistrictPicker.js';
import DistrictPicker from './components/DistrictPicker.js';
import SejjelInput from './components/SejjelInput.js';
import GenderPicker from './components/GenderPicker.js';
import MapboxMap from './components/MapboxMap.js';

/**
 * Processes the polling station data into an index
 * @param {Object[]} json
 * @return An index of the polling stations grouped by sect,gender
 */
function process(json) {
  var index = {};
  json.forEach((item) => {
    let {sect, gender, subdistrict} = item;
    if (!index[sect]) {
      index[sect] = {};
    }
    if (!index[sect][subdistrict]) {
      index[sect][subdistrict] = {};
    }
    if (!index[sect][subdistrict][gender]) {
      index[sect][subdistrict][gender] = [];
    };
    index[item.sect][subdistrict][item.gender].push(item);
  });
  return index;
}

/**
 * Grabs the subdistrict keys from the geojson and adds it to
 * to the json that will act as an index
 * @param {Object} json
 * @param {Object} geojson
 * @return {Object} Unified JSON
 */
function join(json, geojson) {
  var subdistricts = {};
  var locations = {};
  geojson.features.forEach((feature) => {
    var props = feature.properties;
    subdistricts[props['ID']] = getDistrictKey(districtArToEn(props['Subdistrict']));
    locations[props['ID']] = feature.geometry.coordinates;
  });

  return json.map((row) => {
    var subdistrict = subdistricts[row.place];
    var location = locations[row.place];
    return Object.assign({}, row, {
      subdistrict: subdistrict, center: location
    });
  });
}

/**
 * Checks if the entered values exist in the index
 * @param {Object} index
 * @param {Object} entry
 * @returns {Object[]} list of matching polling stations
 */
function checkInIndex(index, entry) {
  console.log(entry);
  let { sect, subdistrict, gender, val } = entry;
  var fromIndex = index[sect][subdistrict][gender];
  return fromIndex.filter((row) => {
    return Number(row.from) <= Number(val) &&
      Number(val) <= Number(row.to);
  });
}

class App extends Component {
  constructor() {
    super();
    var self = this;
    fetch('data/data.json').then((res) => {
      return res.json();
    }).then((json) => {
      fetch('data/pollingstations.geojson').then( (res) => {
        return res.json();
      }).then( (geojson) => {
        self.geo = geojson;
        self.data = process(join(json, geojson));
      });
    });
  }

  getInitialState() {

    return {
      center: null
    };
  }

  validateInput(e) {
    e.preventDefault();
    var locations = checkInIndex(this.data, {
      sect: Number(this.state.sect),
      subdistrict: Number(this.state.subdistrict),
      gender: 'F',
      val: this.state.sejjel
    });

    if (locations.length > 0) {
      console.log(locations);
      // Take the first one for now
      let new_location = locations[0].center;
      this.setState({
        center: new_location
      });
    } else {
      console.log('couldn\'t find location');
    }

  }

  fromGenderPicker(value) {
    this.setState({gender: value});
  }

  render(props, state) {
    console.log('CURRENT_STATE', state);
    return h(
      'div', {id: 'app'},
      h(MapboxMap, {center: this.state.center}),
      h('div', {id: 'form'},
        h('header', null,
          h('h1', null, 'Where do I vote?'),
          h('h2', null, 'Find your polling center')
         ),
        h(SectPicker, {
          options: state.sects,
          onChange: this.linkState('sect'),
          selected: state.sect
        }),
        h(DistrictPicker, {
          options: state.districts,
          onChange: this.linkState('subdistrict'),
          selected: state.subdistrict
        }),
        h(GenderPicker, {
          onClick: this.fromGenderPicker.bind(this)
        }),
        h(SejjelInput, {
          onInput: this.linkState('sejjel'),
          sejjel: state.sejjel
        }),
        h('input', {
          type: 'submit',
          value: 'Check',
          onClick: this.validateInput.bind(this)
        }, 'Check')
       ),
      h('footer', {id: 'footer'},
        h('div', null,
          h('span', null),
          'Map made with ♥ by ',
          h('a', {href: 'http://beirutmadinati.com', target: '_blank'}, 'Beirut Madinati'),
          ' volunteers. ',
          h('a', {href: 'http://github.com/kamicut/vote-here-2016'}, 'Link to data & code')
         ))
    );

  }
}

render(h(App), document.body);
