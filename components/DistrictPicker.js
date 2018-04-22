import {h} from 'preact';
const labels = require('../i18n.json');
const districts = require('../data/districts.json');

const DistrictPicker = ({lang, selected, availableDistricts, onChange}) => {
  const mappedOptions = (availableDistricts || []).map(id =>
    h('option', { value: id, key: id }, districts[id][`name_${lang}`])
  );

  return h(
    'span', {id: 'districtpicker'},
    h('label', {}, labels[lang].labels.district),
    h('br'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels.district_default),
      mappedOptions));
};
export default DistrictPicker;
