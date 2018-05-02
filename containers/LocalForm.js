import {h, Component} from 'preact';
import Form from '../components/LocalForm.js';
import countriesData from '../data/countries.json';
import locationsData from '../data/polling_station_locations.json';
import labels from '../i18n.json';
import linkState from 'linkstate';

export default class LocalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: null,
      error: '',
      selected: false,
      lang: 'ar',
      locations: []
    }
  }

  validateInput(e) {
    e.preventDefault();
    let {sect, village, gender, sejjel, lang} = this.state;

    var valid = true;

    valid = valid && sect && !isNaN(sect);
    valid = valid && village && !isNaN(village);
    valid = valid && sejjel && !isNaN(sejjel);
    valid = valid && gender && (gender === 'M' || gender === 'F');

    if (valid) {
      var locations = checkInIndex(this.data, {
        sect: Number(sect),
        village: Number(village),
        gender: gender,
        val: sejjel
      });
      if (locations.length > 0) {
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

  render ({ lang }, state) {
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
          )
        )
        : h(Form, {
          class: (state.selected ? 'hide-form' : ''),
          sect: state.sect,
          gender: state.gender,
          village: state.village,
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
