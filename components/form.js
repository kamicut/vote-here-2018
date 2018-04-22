import {h} from 'preact';

import CountryPicker from './CountryPicker.js';
import DistrictPicker from './DistrictPicker.js';

const labels = require('../i18n.json');

const Form = ({lang, country, districts, district, actions}) => {
  return h(
    'div', {id: 'form'},
    h('header', null,
      h('h1', null, labels[lang].title),
      h('h2', null, labels[lang].subtitle)
    ),
    h(CountryPicker, {
      onChange: actions.changeCountry,
      selected: country,
      lang: lang
    }),
    h('br'),
    h(DistrictPicker, {
      onChange: actions.changeDistrict,
      selected: district,
      availableDistricts: districts,
      lang: lang
    }),
    h('br'),
    h('input', {
      type: 'submit',
      value: labels[lang].labels.submit,
      onClick: actions.submit
    }, labels[lang].labels.submit)
  );
}

export default Form;
