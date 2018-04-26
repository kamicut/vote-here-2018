import {h} from 'preact';
const labels = require('../i18n.json');
const districts = require('../data/districts.json');

function districtSorter(lang) {
  return (a,b) => {
    let nameA = districts[a][`name_${lang}`];
    let nameB = districts[b][`name_${lang}`];

    if (nameA > nameB) return 1;
    if (nameB < nameA) return -1;
    return 0;

  }
}

const DistrictPicker = ({ lang, selected, availableDistricts, onChange }) => {
  const mappedOptions = (availableDistricts || []).sort(districtSorter(lang)).map(id =>
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
