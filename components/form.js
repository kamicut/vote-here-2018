import {h} from 'preact';

import SectPicker from './SectPicker.js';
import DistrictPicker from './DistrictPicker.js';
import SejjelInput from './SejjelInput.js';
import GenderPicker from './GenderPicker.js';

const labels = require('../i18n.json');

const Form = ({lang, sect, subdistrict, sejjel, gender, actions}) => {
  return h(
    'div', {id: 'form'},
    h('header', null,
      h('h1', null, labels[lang].title),
      h('h2', null, labels[lang].subtitle)
     ),
    h(SectPicker, {
      onChange: actions.changeSect,
      selected: sect,
      lang: lang
    }),
    h('br'),
    h(DistrictPicker, {
      onChange: actions.changeSubdistrict,
      selected: subdistrict,
      lang: lang
    }),
    h(GenderPicker, {
      onClick: actions.changeGender,
      gender: gender,
      lang: lang
    }),
    h(SejjelInput, {
      onInput: actions.changeSejjel,
      sejjel: sejjel,
      lang: lang
    }),
    h('input', {
      type: 'submit',
      value: labels[lang].labels.submit,
      onClick: actions.submit
    }, labels[lang].labels.submit)
  );
}

export default Form;
