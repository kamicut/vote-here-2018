import {h} from 'preact';
const labels = require('../i18n.json');
const countries = require('../data/countries.json');

const CountryPicker = ({lang, selected, onChange}) => {
  const mappedOptions = Object.keys(countries).map(id =>
    h('option', { value: id, key: id }, countries[id][`name_${lang}`])
  );

  return h(
    'span', {id: 'countrypicker'},
    h('label', {}, labels[lang].labels.country),
    h('br'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels.country_default),
      mappedOptions));
};
export default CountryPicker;
