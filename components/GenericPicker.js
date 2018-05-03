import {h} from 'preact';
const labels = require('../i18n.json');
const sortBy = require('lodash.sortby');

const GenericPicker = ({lang, selected, name, onChange, options}) => {
  const mappedOptions = sortBy(Object.keys(options), key =>
    options[key][`name_${lang}`]
  ).map(id =>
    h('option', { value: id, key: id }, options[id][`name_${lang}`])
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
