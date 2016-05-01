import {h} from 'preact';

import SectPicker from './SectPicker.js';
import DistrictPicker from './DistrictPicker.js';
import SejjelInput from './SejjelInput.js';
import GenderPicker from './GenderPicker.js';

const Form = ({sect, subdistrict, sejjel, gender, actions}) => {
  return h(
    'div', {id: 'form'},
    h('header', null,
      h('h1', null, 'Where do I vote?'),
      h('h2', null, 'Beirut Municipal Election 2016')
     ),
    h(SectPicker, {
      onChange: actions.changeSect,
      selected: sect
    }),
    h(DistrictPicker, {
      onChange: actions.changeSubdistrict,
      selected: subdistrict
    }),
    h(GenderPicker, {
      onClick: actions.changeGender,
      gender: gender
    }),
    h(SejjelInput, {
      onInput: actions.changeSejjel,
      sejjel: sejjel
    }),
    h('input', {
      type: 'submit',
      value: 'Check',
      onClick: actions.submit
    }, 'Check')
  );
}

export default Form;
