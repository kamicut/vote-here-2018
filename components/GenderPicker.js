import {h} from 'preact';
const labels = require('../i18n.json');

const GenderPicker = (props) => {
  const lang = props.lang;
  return h(
    'div', {id: 'genderpicker'},
    h('label', {}, labels[lang].labels.gender),
    h('br'),
    h('input', {
      type: 'radio',
      value: 'F',
      checked: (props.gender === 'F'),
      onClick: () => props.onClick('F')
    }),
    labels[lang].labels.female,
    h('br'),
    h('input', {
      type: 'radio',
      value: 'M',
      checked: (props.gender === 'M'),
      onClick: () => props.onClick('M')
    }),
    labels[lang].labels.male,
    h('br')
  );
};

export default GenderPicker;
