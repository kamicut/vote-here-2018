import {h} from 'preact';
const labels = require('../i18n.json');

const districts =  {
  'Achrafieh': 1,
  'Rmeil': 2,
  'Bachoura': 4,
  'Saifi': 3,
  'Mazraaa': 7,
  'Mina el Hosn': 12,
  'Mdawar': 5,
  'Zqaq el Blat': 11,
  'Raas Beirut': 10,
  'Msaitbe': 8,
  'Mreisse': 9,
  'Marfa': 6
};

const districts_ar = {
  'الاشرفية': 'Achrafieh',
  'الباشورة': 'Bachoura',
  'الرميل': 'Rmeil',
  'الصيفي': 'Saifi',
  'المزرعة': 'Mazraaa',
  'ميناء الحصن': 'Mina el Hosn',
  'المدور': 'Mdawar',
  'زقاق البلاط': 'Zqaq el Blat',
  'رأس بيروت': 'Raas Beirut',
  'المصيطبة': 'Msaitbe',
  'دار المريسة': 'Mreisse',
  'المرفأ': 'Marfa'
};


const districts_en = {};
for (let key in districts_ar) {
  districts_en[districts_ar[key]] = key;
}
const districtKeys = {};
for (let key in districts) {
  districtKeys[districts[key]] = key;
}

export function getDistrictName(key) {
  return districtKeys[key];
}

export function getDistrictKey(name) {
  return districts[name];
}

export function districtArToEn(name) {
  return districts_ar[name];
}

export function districtEnToAr(name) {
  return districts_en[name];
}

const DistrictPicker = ({lang, selected, onChange}) => {
  const mappedOptions = Object.keys(districts).map((option) => {
    const text = (lang === 'ar'? districtEnToAr(option):option);
    return h('option', {value: districts[option], key: districts[option]}, text);
  });
  return h(
    'span', {id: 'districtpicker'},
    h('label', {}, labels[lang].labels.district),
    h('br'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels.district_default),
      mappedOptions));
};
export default DistrictPicker;
