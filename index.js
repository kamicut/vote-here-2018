import 'whatwg-fetch';

import {h, render, Component} from 'preact';
import MapboxMap from './components/MapboxMap.js';
import Form from './components/form.js';

const labels = require('./i18n.json');

/**
 * Processes the polling station data into an index
 * @param {Object[]} json
 * @return An index of the polling stations grouped by sect,gender
 */
function process(json) {
  console.log(json);
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
  var locations = {};
  var infos = {};

  // TODO make this more efficient
  geojson.features.forEach((feature) => {
    var props = feature.properties;
    locations[props['ID']] = feature.geometry.coordinates;
    infos[props['ID']] = props;
  });

  return json.map((row) => {
    var location = locations[row.place];
    var info = infos[row.place];
    return Object.assign({}, row, {
      center: location, info
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
      center: null,
      error: '',
      selected: false,
      lang: 'ar'
    };
  }

  validateInput(e) {
    e.preventDefault();
    let {sect, subdistrict, gender, sejjel, lang} = this.state;

    var valid = true;

    valid = valid && sect && !isNaN(sect);
    valid = valid && subdistrict && !isNaN(subdistrict);
    valid = valid && sejjel && !isNaN(sejjel);
    valid = valid && gender && (gender === 'M' || gender === 'F');

    if (valid) {
      var locations = checkInIndex(this.data, {
        sect: Number(sect),
        subdistrict: Number(subdistrict),
        gender: gender,
        val: sejjel
      });
      if (locations.length > 0) {
        console.log(locations);
        // Take the first one for now
        let new_location = locations[0];
        this.setState({
          center: new_location.center,
          location: new_location.info,
          room: new_location.room,
          kalam: new_location.kalam,
          selected: true,
          error: ''
        });
      } else {
        this.setState({
          error: labels[lang].errors.location_not_found
        });
      }
    }
    else {
      this.setState({
        error: labels[lang].errors.location_not_found
      });
    }
  }

  fromGenderPicker(value) {
    this.setState({gender: value});
  }

  returnToForm() {
    this.setState({selected: false});
  }

  setLang(lang) {
    this.setState({lang: lang});
  }

  render(props, state) {
    console.log('CURRENT_STATE', state);
    return h(
      'div', {id: 'app'},
      h(MapboxMap, {center: state.center, id: (state.location && state.location.ID) || 0}),
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
               ? h('p', {}, state.location.NAME_AR)
               : h('p', {}, state.location.NAME_EN)),
              h('div', {}, labels[state.lang].labels.kalam + ' ' + state.kalam),
              h('div', {}, labels[state.lang].labels.room + ' ' + state.room),
              h('a', {
                href:'https://maps.google.com/?q=' + state.center[1] + ',' + state.center[0] + '&t=k',
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
          sect: state.sect,
          gender: state.gender,
          subdistrict: state.subdistrict,
          sejjel: state.sejjel,
          lang: state.lang,
          actions: {
            changeSejjel: this.linkState('sejjel'),
            changeSubdistrict: this.linkState('subdistrict'),
            changeSect: this.linkState('sect'),
            changeGender: this.fromGenderPicker.bind(this),
            submit: this.validateInput.bind(this)
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
