import {h} from 'preact';

const SejjelInput = ({value, onInput}) => {
  return h('input', {
    onInput: onInput,
    type: 'text',
    value: value
  });
};

export default SejjelInput;
