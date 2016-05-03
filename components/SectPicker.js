import {h} from 'preact';
const labels = require('../i18n.json');

const sects =  {
  'Armenian Orthodox': 1,
  'Armenian Catholic': 2,
  'Israelite': 3,
  'Achouri': 4,
  'Achouri Orthodoxe': 5,
  'Evangelical': 6,
  'Druze': 7,
  'Greek Orthodox': 8,
  'Greek Catholic': 9,
  'Syriac Orthodox': 10,
  'Syriac Catholic': 11,
  'Sunni': 12,
  'Shia': 13,
  'Alawite': 14,
  'Caldan': 15,
  'Caldan Orthodoxe': 16,
  'Caldan Catholic': 17,
  'Latin': 18,
  'Maronite': 19,
  'Other': 20
}

const sects_map = {
  'Armenian Orthodox': 'ارمن ارثوذكس',
  'Armenian Catholic': 'ارمن كاثوليك',
  'Israelite': 'اسرائيلي',
  'Achouri': 'اشوري',
  'Achouri Orthodoxe': 'اشوري ارثوذكس',
  'Evangelical': 'انجيلي',
  'Druze': 'درزي',
  'Greek Orthodox': 'روم ارثوذكس',
  'Greek Catholic': 'روم كاثوليك',
  'Syriac Orthodox': 'سريان ارثوذكس',
  'Syriac Catholic': 'سريان كاثوليك',
  'Sunni': 'سني',
  'Shia': 'شيعي',
  'Alawite': 'علوي',
  'Caldan': 'كلدان',
  'Caldan Orthodoxe': 'كلدان ارثوذكس',
  'Caldan Catholic': 'كلدان كاثوليك',
  'Latin': 'لاتين',
  'Maronite': 'ماروني',
  'Other': 'مختلط'
}

const SectPicker = ({lang, selected, onChange}) => {
  const mappedOptions = Object.keys(sects).map((option) => {
    const text = (lang === 'ar'? sects_map[option]:option);
    return h('option', {value: sects[option], key: sects[option]}, text);
  });
  return h(
    'span', {id: 'sectpicker'},
    h('label', {}, labels[lang].labels.sect),
    h('br'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels.sect_default),
      mappedOptions));
};
export default SectPicker;
