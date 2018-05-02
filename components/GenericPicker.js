import {h} from 'preact';
const labels = require('../i18n.json');
const sortBy = require('lodash.sortby');

const GenericPicker = ({lang, selected, name, onChange, options}) => {
  const sortedOptions = sortBy(options, option => option[`name_${lang}`]);
  const mappedOptions = Object.keys(sortedOptions).map(id =>
    h('option', { value: id, key: id }, sortedOptions[id][`name_${lang}`])
  );

  return h(
    'span', {id: `${name}picker`},
    h('label', {}, labels[lang].labels[name]),
    h('br'),
    h('select', {
      style: { direction: lang === 'ar'? 'rtl': 'ltr' },
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels[`${name}_default`]),
      mappedOptions));
};

export default GenericPicker;
