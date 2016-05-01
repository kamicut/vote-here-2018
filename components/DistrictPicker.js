import {h} from 'preact';

const districts =  {
  'Achrafieh': 1,
  'Rmeil': 2,
  'Bachoura': 3,
  'Saifi': 4,
  'Mazraaa': 5,
  'Mina el Hosn': 6,
  'Mdawar': 7,
  'Zkak el Blat': 8,
  'Raas Beirut': 9,
  'Msaitbe': 10,
  'Mreisse': 11,
  'Marfa': 12
}

const districts_ar = {
  'الاشرفية': 'Achrafieh',
  'الباشورة': 'Bachoura',
  'الرميل': 'Rmeil',
  'الصيفي': 'Saifi',
  'المزرعة': 'Mazraaa',
  'ميناء الحصن': 'Mina el Hosn',
  'المدور': 'Mdawar',
  'زقاق البلاط': 'Zkak el Blat',
  'رأس بيروت': 'Raas Beirut',
  'المصيطبة': 'Msaitbe',
  'دار المريسة': 'Mreisse',
  'المرفأ': 'Marfa'
}


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

const DistrictPicker = ({selected, onChange}) => {
  const mappedOptions = Object.keys(districts).map((option) => {
    return h('option', {value: districts[option], key: districts[option]}, option);
  });
  return h(
    'span', {id: 'districtpicker'},
    h('label', {}, 'District:'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, 'Choose a district'),
      mappedOptions));
};
export default DistrictPicker;
