import {h} from 'preact';
const labels = require('../i18n.json');
const countries = require('../data/countries.json');
const sortBy = require('lodash.sortby');

function countrySorter(lang) {
  return o => countries[+o][`name_${lang}`];
}

const CountryPicker = ({lang, selected, onChange}) => {
  const mappedOptions = sortBy(Object.keys(countries), countrySorter(lang)).map(id =>
    h('option', { value: id, key: id }, countries[id][`name_${lang}`])
  );

  return h(
    'span', {id: 'countrypicker'},
    h('label', {}, labels[lang].labels.country),
    h('br'),
    h('select', {
      style: { direction: lang === 'ar'? 'rtl': 'ltr' },
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels.country_default),
      mappedOptions));
};
export default CountryPicker;
