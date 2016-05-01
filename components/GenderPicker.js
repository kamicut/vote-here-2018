import {h} from 'preact';

const GenderPicker = (props) => {
  return h(
    'div', {id: 'genderpicker'},
    h('label', {}, 'Gender:'),
    h('br'),
    h('input', {
      type: 'radio',
      value: 'F',
      checked: (props.gender === 'F'),
      onClick: () => props.onClick('F')
    }),
    'Female',
    h('br'),
    h('input', {
      type: 'radio',
      value: 'M',
      checked: (props.gender === 'M'),
      onClick: () => props.onClick('M')
    }, 'Male'),
    'Male',
    h('br')
  );
};

export default GenderPicker;
