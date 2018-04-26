import {h} from 'preact';
const labels = require('../i18n.json');
const districts = require('../data/districts.json');
const sortBy = require('lodash.sortby');

function districtSorter(lang) {
  return o => districts[+o][`name_${lang}`];
}

const DistrictPicker = ({ lang, selected, availableDistricts, onChange }) => {
  const mappedOptions = sortBy(availableDistricts || [], districtSorter(lang)).map(id =>
    h('option', { value: id, key: id }, districts[id][`name_${lang}`])
  );

  return h(
    'span', { id: 'districtpicker' },
    h('label', {}, labels[lang].labels.district),
    h('br'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', { disabled: true, selected: 'default' }, labels[lang].labels.district_default),
      mappedOptions));
};
export default DistrictPicker;
