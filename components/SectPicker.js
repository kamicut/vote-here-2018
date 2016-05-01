import {h} from 'preact';

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

const SectPicker = ({selected, onChange}) => {
  const mappedOptions = Object.keys(sects).map((option) => {
    return h('option', {value: sects[option], key: sects[option]}, option);
  });
  return h(
    'span', {id: 'sectpicker'},
    h('label', {}, 'Sect:'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, 'Choose a sect'),
      mappedOptions));
};
export default SectPicker;
