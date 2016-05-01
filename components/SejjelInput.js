import {h} from 'preact';

const SejjelInput = ({sejjel, onInput}) => h(
  'div', {id: 'sejjelinput'},
  h('label', {}, 'Sejjel: '),
  h('br'),
  h('input', {
    onInput: onInput,
    type: 'text',
    placeholder: 'Sejjel Number',
    value: sejjel
  })
);

export default SejjelInput;
