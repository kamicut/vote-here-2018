import {h} from 'preact';

import GenericPicker from './GenericPicker.js';
import SejjelInput from './SejjelInput.js';
import GenderPicker from './GenderPicker.js';

const labels = require('../i18n.json');
const sects = require('../data/sects.json');
const villages = require('../data/villages.json');

const Form = ({lang, sect, village, sejjel, gender, actions}) => {
  return h(
    'div', {id: 'form'},
    h('header', null,
      h('h1', null, labels[lang].title_local),
      h('h2', null, labels[lang].subtitle)
     ),
    h(GenericPicker, {
      name: 'sect',
      onChange: actions.changeSect,
      options: sects,
      selected: sect,
      lang
    }),
    h('br'),
    h(GenericPicker, {
      name: 'village',
      onChange: actions.changeVillage,
      options: villages,
      selected: village,
      lang
    }),
    h(GenderPicker, {
      onClick: actions.changeGender,
      gender: gender,
      lang
    }),
    h(SejjelInput, {
      onInput: actions.changeSejjel,
      sejjel: sejjel,
      lang
    }),
    h('input', {
      type: 'submit',
      value: labels[lang].labels.submit,
      onClick: actions.submit
    }, labels[lang].labels.submit)
  );
}

export default Form;
