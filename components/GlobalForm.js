import {h} from 'preact';

import CountryPicker from './CountryPicker.js';
import DistrictPicker from './DistrictPicker.js';
import LocationPicker from './LocationPicker.js';

const labels = require('../i18n.json');

const Form = ({lang, countryId, districts, locations, districtId, locationId, actions}) => {
  return h(
    'div', {id: 'form'},
    h('header', null,
      h('h1', null, labels[lang].title),
      h('h2', null, labels[lang].subtitle)
    ),
    h(CountryPicker, {
      onChange: actions.changeCountry,
      selected: countryId,
      lang: lang
    }),
    h('br'),
    h(DistrictPicker, {
      onChange: actions.changeDistrict,
      selected: districtId,
      availableDistricts: districts,
      lang: lang
    }),
    h('br'),
    h(LocationPicker, {
      onChange: actions.changeLocation,
      selected: locationId,
      locations: locations,
      lang: lang
    }),
    h('br'),
    h('input', {
      disabled: !locationId,
      type: 'submit',
      value: labels[lang].labels.submit,
      onClick: actions.submit
    }, labels[lang].labels.submit)
  );
}

export default Form;
