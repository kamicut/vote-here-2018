import {h, Component} from 'preact';
import Form from '../components/LocalForm.js';
import countriesData from '../data/countries.json';
import locationsData from '../data/polling_station_locations.json';
import labels from '../i18n.json';
import linkState from 'linkstate';
import sects from '../data/sects.json';

/**
 * Returns an object with the name_ar as keys
 */
function normalize(data) {
  return Object.keys(data).reduce((obj, id) => {
    obj[data[id].name_ar] = id;
    return obj;
  }, {});
}

/**
 * Processes the polling station data into an index
 *
 * @param {Object[]} json
 * @return An index of the polling stations grouped by sect,gender
 */
function process(json, villages) {
  const selectSects = normalize(sects);
  const selectVillages = normalize(villages);

  return json.reduce((index, item) => {
    let sect = selectSects[item.sect];

    if (!index[sect]) {
      index[sect] = {};
    }

    let village = selectVillages[item.subdistrict];
    if (!index[sect][village]) {
      index[sect][village] = {};
    }

    if (!index[sect][village][item.gender]) {
      index[sect][village][item.gender] = [];
    }

    index[sect][village][item.gender].push(item);

    return index;
  }, {});
}

export default class LocalForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      lang: 'ar',
      locations: []
    }
  }

  componentWillMount() {
    // fetch data according to the district id
    const district = this.props.district;

    fetch(`/data/${district}/data.json`)
      .then(response => {
        if (response.ok) {
          response.json().then(json => {
            fetch(`/data/${district}/villages.json`)
            .then(response => {
              if (response.ok) {
                response.json().then(villages => {
                  this.setState({
                    data: process(json, villages),
                    villages: villages
                  });
                })
              }
            })
          });
        }
      });
  }

  /**
   * Checks if the entered values exist in the index
   */
  checkInIndex() {
    let { sect, village, gender, sejjel, lang } = this.state;
    let data = this.state.data;

    if (data[sect] && data[sect][village] && data[sect][village][gender]) {
      let fromIndex = data[sect][village][gender];
      return fromIndex.filter(row => +row.from <= +sejjel && +sejjel <= +row.to);
    }

    return null;
  }

  validateInput(e) {
    e.preventDefault();

    let {sect, village, gender, sejjel, lang} = this.state;

    var valid = [sect, village, gender, sejjel].every(Boolean)

    if (valid) {
      var locations = this.checkInIndex();

      if (locations.length > 0) {
        // Take the first one for now
        let location = locations[0];
        let center = [location.Longitude, location.Latitude];

        this.setState({ location, selected: true });
        this.props.setCoordinates(center);
        this.props.changeError('');
      } else {
        this.props.changeError(labels[lang].errors.location_not_found);
      }
    } else {
      this.props.changeError(labels[lang].errors.validation_error);
    }
  }

  returnToForm() {
    this.setState({ selected: false });
  }

  render ({ lang, district }, state) {
    const {data} = state;
    if (!data) {
      console.log('still Fetching');
      return h('div', {}, 'loading...');
    }

    return h('div',
      {},
      (state.selected
        ? h('div', {
          id: 'form'
        },
          (lang === 'ar'
            ? h('h2', {}, state.location.place)
            : h('h2', {}, state.location.place)),
          h('h3', {}, state.location.street),
          h('h3', {}, labels[lang].labels.kalam + ' ' + state.location.kalam),
          h('h3', {}, labels[lang].labels.room + ' ' + state.location.room),
          h('a', {
            href: state.location.google_maps_links || 'https://maps.google.com/?q=' + this.props.center[1] + ',' + this.props.center[0] + '&t=k',
            target: '_blank',
            style: { 
              'font-size': '20px', 
              'text-align': 'center',
              'display': 'block',
              'width': '50%',
              'margin': 'auto'
             }
          },
            `>>> ${labels[lang].labels.google_directions} <<<`
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
          district: district,
          sect: state.sect,
          gender: state.gender,
          village: state.village,
          villages: state.villages,
          sejjel: state.sejjel,
          lang,
          actions: {
            changeSejjel: linkState(this, 'sejjel'),
            changeVillage: linkState(this, 'village'),
            changeSect: linkState(this, 'sect'),
            changeGender: linkState(this, 'gender'),
            submit: this.validateInput.bind(this)
          }
        })
      )
    )
  }
}
