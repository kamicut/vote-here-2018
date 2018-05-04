import {h} from 'preact';

import GenericPicker from './GenericPicker.js';
import SejjelInput from './SejjelInput.js';
import GenderPicker from './GenderPicker.js';

const labels = require('../i18n.json');
const districts = require('../data/districts.json');
const sects = require('../data/sects.json');

const Form = ({lang, district, sect, village, villages, sejjel, gender, actions}) => {
  const districtObj = Object.values(districts).filter(dist => dist.id === district)[0];
  const name_lang = `name_${lang}`;
  return h(
    'div', {id: 'form'},
    h('header', null,
      h('h1', null, labels[lang].title_local),
      h('h2', null, `${labels[lang].subtitle} - ${districtObj[name_lang]}`)
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
