import {h} from 'preact';
const labels = require('../i18n.json');

const SejjelInput = ({sejjel, onInput, lang}) => h(
  'div', {id: 'sejjelinput'},
  h('label', {}, labels[lang].labels.sejjel),
  h('br'),
  h('input', {
    onInput: onInput,
    type: 'text',
    placeholder: labels[lang].labels.sejjel_default,
    value: sejjel
  })
);

export default SejjelInput;
