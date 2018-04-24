import {h} from 'preact';
const labels = require('../i18n.json');
const polling_stations = require('../data/polling_station_locations.json');

const LocationPicker = ({lang, selected, locations, onChange}) => {
  const mappedOptions = locations.map(id =>
    h('option', { value: id, key: id }, polling_stations[id][`name_${lang}`])
  );

  return h(
    'span', {id: 'locationpicker'},
    h('label', {}, labels[lang].labels.polling_station),
    h('br'),
    h('select', {
      onChange: onChange,
      value: selected
    },
      h('option', {disabled: true, selected: 'default'}, labels[lang].labels.polling_station_default),
      mappedOptions));
};

export default LocationPicker;
