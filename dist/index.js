(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDistrictName = getDistrictName;
exports.getDistrictKey = getDistrictKey;
exports.districtArToEn = districtArToEn;
exports.districtEnToAr = districtEnToAr;

var _preact = require('preact');

var labels = require('../i18n.json');

var districts = {
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
};

var districts_ar = {
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
};

var districts_en = {};
for (var key in districts_ar) {
  districts_en[districts_ar[key]] = key;
}
var districtKeys = {};
for (var _key in districts) {
  districtKeys[districts[_key]] = _key;
}

function getDistrictName(key) {
  return districtKeys[key];
}

function getDistrictKey(name) {
  return districts[name];
}

function districtArToEn(name) {
  return districts_ar[name];
}

function districtEnToAr(name) {
  return districts_en[name];
}

var DistrictPicker = function DistrictPicker(_ref) {
  var lang = _ref.lang;
  var selected = _ref.selected;
  var onChange = _ref.onChange;

  var mappedOptions = Object.keys(districts).map(function (option) {
    var text = lang === 'ar' ? districtEnToAr(option) : option;
    return (0, _preact.h)('option', { value: districts[option], key: districts[option] }, text);
  });
  return (0, _preact.h)('span', { id: 'districtpicker' }, (0, _preact.h)('label', {}, labels[lang].labels.district), (0, _preact.h)('br'), (0, _preact.h)('select', {
    onChange: onChange,
    value: selected
  }, (0, _preact.h)('option', { disabled: true, selected: 'default' }, labels[lang].labels.district_default), mappedOptions));
};
exports.default = DistrictPicker;

},{"../i18n.json":7,"preact":9}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var labels = require('../i18n.json');

var GenderPicker = function GenderPicker(props) {
  var lang = props.lang;
  return (0, _preact.h)('div', { id: 'genderpicker' }, (0, _preact.h)('label', {}, labels[lang].labels.gender), (0, _preact.h)('br'), (0, _preact.h)('input', {
    type: 'radio',
    value: 'F',
    checked: props.gender === 'F',
    onClick: function onClick() {
      return props.onClick('F');
    }
  }), labels[lang].labels.female, (0, _preact.h)('br'), (0, _preact.h)('input', {
    type: 'radio',
    value: 'M',
    checked: props.gender === 'M',
    onClick: function onClick() {
      return props.onClick('M');
    }
  }), labels[lang].labels.male, (0, _preact.h)('br'));
};

exports.default = GenderPicker;

},{"../i18n.json":7,"preact":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _preact = require('preact');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapboxMap = function (_Component) {
  _inherits(MapboxMap, _Component);

  function MapboxMap() {
    _classCallCheck(this, MapboxMap);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MapboxMap).apply(this, arguments));
  }

  _createClass(MapboxMap, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      mapboxgl.accessToken = 'pk.eyJ1Ijoia2FtaWN1dCIsImEiOiJMVzF2NThZIn0.WO0ArcIIzYVioen3HpfugQ';
      var mapCenter = this.props.center || [35.507126, 33.883812];
      this.map = new mapboxgl.Map({
        container: this._map,
        // style: 'mapbox://styles/kamicut/cinm462nw001nbom6nnwz899p', //stylesheet location
        style: 'mapbox://styles/kamicut/cinort42e0044btm4ni0q4t5t',
        center: mapCenter,
        maxBounds: [[35.445671, 33.860010], [35.550556, 33.920144]],
        zoom: 12.5 // starting zoom
      });

      // Force a rerender
      setTimeout(function () {
        return _this2.map.resize();
      }, 0);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.center) {
        this.map.flyTo({ center: nextProps.center, zoom: 17 });
        this.center = nextProps.center;
        this.map.setFilter('pollingstations', ['==', 'ID', nextProps.id]);
        this.map.setPaintProperty('pollingstations', 'circle-opacity', 1);
        this.map.setFilter('station_numbers', ['==', 'ID', nextProps.id]);
        this.map.setPaintProperty('station_numbers', 'text-opacity', 1);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return (0, _preact.h)('div', {
        id: 'map',
        style: 'position:absolute; top:0; bottom:0; width:100%; z-index: -1',
        ref: function ref(m) {
          return _this3._map = m;
        } });
    }
  }]);

  return MapboxMap;
}(_preact.Component);

exports.default = MapboxMap;

},{"preact":9}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var labels = require('../i18n.json');

var sects = {
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
};

var sects_map = {
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
};

var SectPicker = function SectPicker(_ref) {
  var lang = _ref.lang;
  var selected = _ref.selected;
  var onChange = _ref.onChange;

  var mappedOptions = Object.keys(sects).map(function (option) {
    var text = lang === 'ar' ? sects_map[option] : option;
    return (0, _preact.h)('option', { value: sects[option], key: sects[option] }, text);
  });
  return (0, _preact.h)('span', { id: 'sectpicker' }, (0, _preact.h)('label', {}, labels[lang].labels.sect), (0, _preact.h)('br'), (0, _preact.h)('select', {
    onChange: onChange,
    value: selected
  }, (0, _preact.h)('option', { disabled: true, selected: 'default' }, labels[lang].labels.sect_default), mappedOptions));
};
exports.default = SectPicker;

},{"../i18n.json":7,"preact":9}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var labels = require('../i18n.json');

var SejjelInput = function SejjelInput(_ref) {
  var sejjel = _ref.sejjel;
  var onInput = _ref.onInput;
  var lang = _ref.lang;
  return (0, _preact.h)('div', { id: 'sejjelinput' }, (0, _preact.h)('label', {}, labels[lang].labels.sejjel), (0, _preact.h)('br'), (0, _preact.h)('input', {
    onInput: onInput,
    type: 'text',
    placeholder: labels[lang].labels.sejjel_default,
    value: sejjel
  }));
};

exports.default = SejjelInput;

},{"../i18n.json":7,"preact":9}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _preact = require('preact');

var _SectPicker = require('./SectPicker.js');

var _SectPicker2 = _interopRequireDefault(_SectPicker);

var _DistrictPicker = require('./DistrictPicker.js');

var _DistrictPicker2 = _interopRequireDefault(_DistrictPicker);

var _SejjelInput = require('./SejjelInput.js');

var _SejjelInput2 = _interopRequireDefault(_SejjelInput);

var _GenderPicker = require('./GenderPicker.js');

var _GenderPicker2 = _interopRequireDefault(_GenderPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labels = require('../i18n.json');

var Form = function Form(_ref) {
  var lang = _ref.lang;
  var sect = _ref.sect;
  var subdistrict = _ref.subdistrict;
  var sejjel = _ref.sejjel;
  var gender = _ref.gender;
  var actions = _ref.actions;

  return (0, _preact.h)('div', { id: 'form' }, (0, _preact.h)('header', null, (0, _preact.h)('h1', null, labels[lang].title), (0, _preact.h)('h2', null, labels[lang].subtitle)), (0, _preact.h)(_SectPicker2.default, {
    onChange: actions.changeSect,
    selected: sect,
    lang: lang
  }), (0, _preact.h)('br'), (0, _preact.h)(_DistrictPicker2.default, {
    onChange: actions.changeSubdistrict,
    selected: subdistrict,
    lang: lang
  }), (0, _preact.h)(_GenderPicker2.default, {
    onClick: actions.changeGender,
    gender: gender,
    lang: lang
  }), (0, _preact.h)(_SejjelInput2.default, {
    onInput: actions.changeSejjel,
    sejjel: sejjel,
    lang: lang
  }), (0, _preact.h)('input', {
    type: 'submit',
    value: labels[lang].labels.submit,
    onClick: actions.submit
  }, labels[lang].labels.submit));
};

exports.default = Form;

},{"../i18n.json":7,"./DistrictPicker.js":1,"./GenderPicker.js":2,"./SectPicker.js":4,"./SejjelInput.js":5,"preact":9}],7:[function(require,module,exports){
module.exports={
  "ar": {
    "title": 'أين أنتخب؟',
    "subtitle": 'الانتخابات البلدية في بيروت',
    "labels": {
      "sect": 'المذهب:',
      "sect_default": 'اختيار المذهب',
      "district": 'المحلة:',
      "district_default": 'اختيار المحلة',
      "gender": 'الجنس:',
      "male": 'ذكر',
      "female": 'أنثى',
      "sejjel": 'رقم السجل:',
      "sejjel_default": 'رقم السجل',
      "submit": 'بحث',
      "google_directions": 'اتجاهات'
    },
    "errors": {
      "location_not_found": 'لا نستطيع تحديد موقع',
      "validation_error": 'تم إدخال المعلومات بشكل غير صحيح. تحقق من الأخطاء'
    }

  },
  "en": {
    "title": 'Where do I vote?',
    "subtitle": 'Beirut Municipal Elections 2016',
    "labels": {
      "sect": 'Sect:',
      "sect_default": 'Choose a sect',
      "district": 'District:',
      "district_default": 'Choose a district',
      "gender": 'gender',
      "male": 'Male',
      "female": 'Female',
      "sejjel": 'Sejjel Number:',
      "sejjel_default": 'Sejjel Number',
      "submit": 'check',
      "google_directions": 'Google Directions'
    },
    "errors": {
      "location_not_found": 'Couldn\'t find location',
      "validation_error": 'Information entered incorrectly. Check for mistakes.'
    }

  }
}

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

var _preact = require('preact');

var _DistrictPicker = require('./components/DistrictPicker.js');

var _MapboxMap = require('./components/MapboxMap.js');

var _MapboxMap2 = _interopRequireDefault(_MapboxMap);

var _form = require('./components/form.js');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var labels = require('./i18n.json');

/**
 * Processes the polling station data into an index
 * @param {Object[]} json
 * @return An index of the polling stations grouped by sect,gender
 */
function process(json) {
  var index = {};
  json.forEach(function (item) {
    var sect = item.sect;
    var gender = item.gender;
    var subdistrict = item.subdistrict;

    if (!index[sect]) {
      index[sect] = {};
    }
    if (!index[sect][subdistrict]) {
      index[sect][subdistrict] = {};
    }
    if (!index[sect][subdistrict][gender]) {
      index[sect][subdistrict][gender] = [];
    };
    index[item.sect][subdistrict][item.gender].push(item);
  });
  return index;
}

/**
 * Grabs the subdistrict keys from the geojson and adds it to
 * to the json that will act as an index
 * @param {Object} json
 * @param {Object} geojson
 * @return {Object} Unified JSON
 */
function join(json, geojson) {
  var subdistricts = {};
  var locations = {};
  var infos = {};

  // TODO make this more efficient
  geojson.features.forEach(function (feature) {
    var props = feature.properties;

    subdistricts[props['ID']] = (0, _DistrictPicker.getDistrictKey)((0, _DistrictPicker.districtArToEn)(props['Subdistrict']));
    locations[props['ID']] = feature.geometry.coordinates;
    infos[props['ID']] = props;
  });

  return json.map(function (row) {
    var subdistrict = subdistricts[row.place];
    var location = locations[row.place];
    var info = infos[row.place];
    return Object.assign({}, row, {
      subdistrict: subdistrict, center: location, info: info
    });
  });
}

/**
 * Checks if the entered values exist in the index
 * @param {Object} index
 * @param {Object} entry
 * @returns {Object[]} list of matching polling stations
 */
function checkInIndex(index, entry) {
  var sect = entry.sect;
  var subdistrict = entry.subdistrict;
  var gender = entry.gender;
  var val = entry.val;

  var fromIndex = index[sect][subdistrict][gender];
  return fromIndex.filter(function (row) {
    return Number(row.from) <= Number(val) && Number(val) <= Number(row.to);
  });
}

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

    var self = _this;
    fetch('data/data.json').then(function (res) {
      return res.json();
    }).then(function (json) {
      fetch('data/pollingstations.geojson').then(function (res) {
        return res.json();
      }).then(function (geojson) {
        self.geo = geojson;
        self.data = process(join(json, geojson));
      });
    });
    return _this;
  }

  _createClass(App, [{
    key: 'getInitialState',
    value: function getInitialState() {
      return {
        center: null,
        error: '',
        selected: false,
        lang: 'ar'
      };
    }
  }, {
    key: 'validateInput',
    value: function validateInput(e) {
      e.preventDefault();
      var _state = this.state;
      var sect = _state.sect;
      var subdistrict = _state.subdistrict;
      var gender = _state.gender;
      var sejjel = _state.sejjel;
      var lang = _state.lang;


      var valid = true;

      valid = valid && sect && !isNaN(sect);
      valid = valid && subdistrict && !isNaN(subdistrict);
      valid = valid && sejjel && !isNaN(sejjel);
      valid = valid && gender && (gender === 'M' || gender === 'F');

      if (valid) {
        var locations = checkInIndex(this.data, {
          sect: Number(sect),
          subdistrict: Number(subdistrict),
          gender: gender,
          val: sejjel
        });
        if (locations.length > 0) {
          console.log(locations);
          // Take the first one for now
          var new_location = locations[0];
          console.log(new_location);
          this.setState({
            center: new_location.center,
            location: new_location.info,
            selected: true,
            error: ''
          });
        } else {
          this.setState({
            error: labels[lang].errors.location_not_found
          });
        }
      } else {
        this.setState({
          error: labels[lang].errors.validation_error
        });
      }
    }
  }, {
    key: 'fromGenderPicker',
    value: function fromGenderPicker(value) {
      this.setState({ gender: value });
    }
  }, {
    key: 'returnToForm',
    value: function returnToForm() {
      this.setState({ selected: false });
    }
  }, {
    key: 'setLang',
    value: function setLang(lang) {
      this.setState({ lang: lang });
    }
  }, {
    key: 'render',
    value: function render(props, state) {
      console.log('CURRENT_STATE', state);
      return (0, _preact.h)('div', { id: 'app' }, (0, _preact.h)(_MapboxMap2.default, { center: state.center, id: state.location && state.location.ID || 0 }), (0, _preact.h)('div', { id: 'main', class: state.lang === 'ar' ? '' : 'override' }, (0, _preact.h)('header', { id: 'lang-selector' }, (0, _preact.h)('a', {
        class: 'lang-btn' + (state.lang === 'ar' ? ' lang-btn-bold' : ''),
        onClick: this.setLang.bind(this, 'ar')
      }, 'AR'), ' | ', (0, _preact.h)('a', {
        class: 'lang-btn' + (state.lang === 'en' ? ' lang-btn-bold' : ''),
        onClick: this.setLang.bind(this, 'en')
      }, 'EN')), state.selected ? (0, _preact.h)('div', {
        id: 'form'
      }, state.lang === 'ar' ? (0, _preact.h)('p', {}, state.location.Name_AR) : (0, _preact.h)('p', {}, state.location.Name_EN), (0, _preact.h)('a', {
        href: 'https://maps.google.com/?q=' + state.center[1] + ',' + state.center[0] + '&t=k',
        target: '_blank'
      }, labels[state.lang].labels.google_directions), (0, _preact.h)('br'), (0, _preact.h)('input', {
        type: 'submit',
        value: 'back',
        onClick: this.returnToForm.bind(this)
      })) : (0, _preact.h)(_form2.default, {
        class: state.selected ? 'hide-form' : '',
        sect: state.sect,
        gender: state.gender,
        subdistrict: state.subdistrict,
        sejjel: state.sejjel,
        lang: state.lang,
        actions: {
          changeSejjel: this.linkState('sejjel'),
          changeSubdistrict: this.linkState('subdistrict'),
          changeSect: this.linkState('sect'),
          changeGender: this.fromGenderPicker.bind(this),
          submit: this.validateInput.bind(this)
        }
      }), (0, _preact.h)('div', { id: 'errors' }, state.error)), (0, _preact.h)('footer', { id: 'footer' }, (0, _preact.h)('div', null, (0, _preact.h)('span', null), 'Map made with ♥ by ', (0, _preact.h)('a', { href: 'http://beirutmadinati.com', target: '_blank' }, 'Beirut Madinati'), ' volunteers. ', (0, _preact.h)('a', { href: 'http://github.com/kamicut/vote-here-2016' }, 'Link to data & code'))));
    }
  }]);

  return App;
}(_preact.Component);

(0, _preact.render)((0, _preact.h)(App), document.body);

},{"./components/DistrictPicker.js":1,"./components/MapboxMap.js":3,"./components/form.js":6,"./i18n.json":7,"preact":9,"whatwg-fetch":10}],9:[function(require,module,exports){
!function(global, factory) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = factory() : 'function' == typeof define && define.amd ? define(factory) : global.preact = factory();
}(this, function() {
    'use strict';
    function VNode(nodeName, attributes, children) {
        this.nodeName = nodeName;
        this.attributes = attributes;
        this.children = children;
    }
    function extend(obj, props) {
        for (var i in props) if (hasOwnProperty.call(props, i)) obj[i] = props[i];
        return obj;
    }
    function clone(obj) {
        var out = {};
        for (var i in obj) out[i] = obj[i];
        return out;
    }
    function memoize(fn, mem) {
        mem = mem || {};
        return function(k) {
            return hasOwnProperty.call(mem, k) ? mem[k] : mem[k] = fn(k);
        };
    }
    function delve(obj, key) {
        for (var p = key.split('.'), i = 0; i < p.length && obj; i++) obj = obj[p[i]];
        return obj;
    }
    function toArray(obj) {
        var arr = [], i = obj.length;
        for (;i--; ) arr[i] = obj[i];
        return arr;
    }
    function styleObjToCss(s) {
        var str = '';
        for (var prop in s) {
            var val = s[prop];
            if (!empty(val)) {
                if (str) str += ' ';
                str += jsToCss(prop);
                str += ': ';
                str += val;
                if ('number' == typeof val && !NON_DIMENSION_PROPS[prop]) str += 'px';
                str += ';';
            }
        }
        return str;
    }
    function hashToClassName(c) {
        var str = '';
        for (var prop in c) if (c[prop]) {
            if (str) str += ' ';
            str += prop;
        }
        return str;
    }
    function normalize(obj, prop, fn) {
        var v = obj[prop];
        if (v && !isString(v)) obj[prop] = fn(v);
    }
    function optionsHook(name, a, b) {
        return hook(options, name, a, b);
    }
    function hook(obj, name, a, b, c) {
        if (obj[name]) return obj[name](a, b, c); else ;
    }
    function deepHook(obj, type) {
        do hook(obj, type); while (obj = obj._component);
    }
    function h(nodeName, attributes) {
        var len = arguments.length, attributeChildren = attributes && attributes.children, children = void 0, arr = void 0, lastSimple = void 0;
        if (attributeChildren) {
            delete attributes.children;
            if (3 > len) return h(nodeName, attributes, attributeChildren);
        }
        for (var i = 2; len > i; i++) {
            var _p = arguments[i];
            if (!falsey(_p)) {
                if (!children) children = [];
                if (_p.join) arr = _p; else {
                    arr = SHARED_TEMP_ARRAY;
                    arr[0] = _p;
                }
                for (var j = 0; j < arr.length; j++) {
                    var child = arr[j], simple = !(falsey(child) || child instanceof VNode);
                    if (simple) child = String(child);
                    if (simple && lastSimple) children[children.length - 1] += child; else if (!falsey(child)) children.push(child);
                    lastSimple = simple;
                }
            } else ;
        }
        var p = new VNode(nodeName, attributes || void 0, children || void 0);
        optionsHook('vnode', p);
        return p;
    }
    function createLinkedState(component, key, eventPath) {
        var path = key.split('.'), p0 = path[0], len = path.length;
        return function(e) {
            var _component$setState;
            var t = this, s = component.state, obj = s, v = void 0, i = void 0;
            if (isString(eventPath)) {
                v = delve(e, eventPath);
                if (empty(v) && (t = t._component)) v = delve(t, eventPath);
            } else v = (t.nodeName + t.type).match(/^input(check|rad)/i) ? t.checked : t.value;
            if (isFunction(v)) v = v.call(t);
            if (len > 1) {
                for (i = 0; len - 1 > i; i++) obj = obj[path[i]] || (obj[path[i]] = {});
                obj[path[i]] = v;
                v = s[p0];
            }
            component.setState((_component$setState = {}, _component$setState[p0] = v, _component$setState));
        };
    }
    function enqueueRender(component) {
        if (1 === items.push(component)) (options.debounceRendering || setImmediate)(rerender);
    }
    function rerender() {
        if (items.length) {
            var currentItems = items, p = void 0;
            items = itemsOffline;
            itemsOffline = currentItems;
            for (;p = currentItems.pop(); ) if (p._dirty) renderComponent(p);
        }
    }
    function isFunctionalComponent(_ref) {
        var nodeName = _ref.nodeName;
        return isFunction(nodeName) && !(nodeName.prototype && nodeName.prototype.render);
    }
    function buildFunctionalComponent(vnode, context) {
        return vnode.nodeName(getNodeProps(vnode), context || EMPTY) || EMPTY_BASE;
    }
    function ensureNodeData(node) {
        return node[ATTR_KEY] || (node[ATTR_KEY] = {});
    }
    function getNodeType(node) {
        return node.nodeType;
    }
    function appendChildren(parent, children) {
        var len = children.length, many = len > 2, into = many ? document.createDocumentFragment() : parent;
        for (var i = 0; len > i; i++) into.appendChild(children[i]);
        if (many) parent.appendChild(into);
    }
    function removeNode(node) {
        var p = node.parentNode;
        if (p) p.removeChild(node);
    }
    function getAccessor(node, name, value, cache) {
        if ('type' !== name && 'style' !== name && name in node) return node[name];
        var attrs = node[ATTR_KEY];
        if (cache !== !1 && attrs && hasOwnProperty.call(attrs, name)) return attrs[name];
        if ('class' === name) return node.className;
        if ('style' === name) return node.style.cssText; else return value;
    }
    function setAccessor(node, name, value) {
        if ('class' === name) node.className = value || ''; else if ('style' === name) node.style.cssText = value || ''; else if ('dangerouslySetInnerHTML' === name) {
            if (value && value.__html) node.innerHTML = value.__html;
        } else if ('key' === name || name in node && 'type' !== name) {
            node[name] = value;
            if (falsey(value)) node.removeAttribute(name);
        } else setComplexAccessor(node, name, value);
        ensureNodeData(node)[name] = value;
    }
    function setComplexAccessor(node, name, value) {
        if ('on' !== name.substring(0, 2)) {
            var type = typeof value;
            if (falsey(value)) node.removeAttribute(name); else if ('function' !== type && 'object' !== type) node.setAttribute(name, value);
        } else {
            var _type = normalizeEventName(name), l = node._listeners || (node._listeners = {}), fn = !l[_type] ? 'add' : !value ? 'remove' : null;
            if (fn) node[fn + 'EventListener'](_type, eventProxy);
            l[_type] = value;
        }
    }
    function eventProxy(e) {
        var fn = this._listeners[normalizeEventName(e.type)];
        if (fn) return fn.call(this, optionsHook('event', e) || e); else ;
    }
    function getNodeAttributes(node) {
        return node[ATTR_KEY] || getRawNodeAttributes(node) || EMPTY;
    }
    function getRawNodeAttributes(node) {
        var list = node.attributes;
        if (!list || !list.getNamedItem) return list; else return getAttributesAsObject(list);
    }
    function getAttributesAsObject(list) {
        var attrs = void 0;
        for (var i = list.length; i--; ) {
            var item = list[i];
            if (!attrs) attrs = {};
            attrs[item.name] = item.value;
        }
        return attrs;
    }
    function isSameNodeType(node, vnode) {
        if (isFunctionalComponent(vnode)) return !0;
        var nodeName = vnode.nodeName;
        if (isFunction(nodeName)) return node._componentConstructor === nodeName;
        if (3 === getNodeType(node)) return isString(vnode); else return toLowerCase(node.nodeName) === nodeName;
    }
    function getNodeProps(vnode) {
        var props = clone(vnode.attributes), c = vnode.children;
        if (c) props.children = c;
        var defaultProps = vnode.nodeName.defaultProps;
        if (defaultProps) for (var i in defaultProps) if (hasOwnProperty.call(defaultProps, i) && !(i in props)) props[i] = defaultProps[i];
        return props;
    }
    function collectNode(node) {
        cleanNode(node);
        var name = normalizeName(node.nodeName), list = nodes[name];
        if (list) list.push(node); else nodes[name] = [ node ];
    }
    function createNode(nodeName) {
        var name = normalizeName(nodeName), list = nodes[name], node = list && list.pop() || document.createElement(nodeName);
        ensureNodeData(node);
        return node;
    }
    function cleanNode(node) {
        removeNode(node);
        if (3 !== getNodeType(node)) {
            if (!node[ATTR_KEY]) node[ATTR_KEY] = getRawNodeAttributes(node);
            node._component = node._componentConstructor = null;
        }
    }
    function diff(dom, vnode, context) {
        var originalAttributes = vnode.attributes;
        for (;isFunctionalComponent(vnode); ) vnode = buildFunctionalComponent(vnode, context);
        if (isFunction(vnode.nodeName)) return buildComponentFromVNode(dom, vnode, context);
        if (isString(vnode)) {
            if (dom) {
                var type = getNodeType(dom);
                if (3 === type) {
                    dom[TEXT_CONTENT] = vnode;
                    return dom;
                } else if (1 === type) collectNode(dom);
            }
            return document.createTextNode(vnode);
        }
        var out = dom, nodeName = vnode.nodeName || UNDEFINED_ELEMENT;
        if (!dom) out = createNode(nodeName); else if (toLowerCase(dom.nodeName) !== nodeName) {
            out = createNode(nodeName);
            appendChildren(out, toArray(dom.childNodes));
            recollectNodeTree(dom);
        }
        innerDiffNode(out, vnode, context);
        diffAttributes(out, vnode);
        if (originalAttributes && originalAttributes.ref) (out[ATTR_KEY].ref = originalAttributes.ref)(out);
        return out;
    }
    function innerDiffNode(dom, vnode, context) {
        var children = void 0, keyed = void 0, keyedLen = 0, len = dom.childNodes.length, childrenLen = 0;
        if (len) {
            children = [];
            for (var i = 0; len > i; i++) {
                var child = dom.childNodes[i], key = child._component ? child._component.__key : getAccessor(child, 'key');
                if (!empty(key)) {
                    if (!keyed) keyed = {};
                    keyed[key] = child;
                    keyedLen++;
                } else children[childrenLen++] = child;
            }
        }
        var vchildren = vnode.children, vlen = vchildren && vchildren.length, min = 0;
        if (vlen) for (var i = 0; vlen > i; i++) {
            var vchild = vchildren[i], child = void 0;
            if (keyedLen) {
                var attrs = vchild.attributes, key = attrs && attrs.key;
                if (!empty(key) && hasOwnProperty.call(keyed, key)) {
                    child = keyed[key];
                    keyed[key] = null;
                    keyedLen--;
                }
            }
            if (!child && childrenLen > min) for (var j = min; childrenLen > j; j++) {
                var c = children[j];
                if (c && isSameNodeType(c, vchild)) {
                    child = c;
                    children[j] = null;
                    if (j === childrenLen - 1) childrenLen--;
                    if (j === min) min++;
                    break;
                }
            }
            child = diff(child, vchild, context);
            if (dom.childNodes[i] !== child) {
                var c = child.parentNode !== dom && child._component, next = dom.childNodes[i + 1];
                if (c) deepHook(c, 'componentWillMount');
                if (next) dom.insertBefore(child, next); else dom.appendChild(child);
                if (c) deepHook(c, 'componentDidMount');
            }
        }
        if (keyedLen) for (var i in keyed) if (hasOwnProperty.call(keyed, i) && keyed[i]) children[min = childrenLen++] = keyed[i];
        if (childrenLen > min) removeOrphanedChildren(children);
    }
    function removeOrphanedChildren(children, unmountOnly) {
        for (var i = children.length; i--; ) {
            var child = children[i];
            if (child) recollectNodeTree(child, unmountOnly);
        }
    }
    function recollectNodeTree(node, unmountOnly) {
        var attrs = node[ATTR_KEY];
        if (attrs) hook(attrs, 'ref', null);
        var component = node._component;
        if (component) unmountComponent(component, !unmountOnly); else {
            if (!unmountOnly) {
                if (1 !== getNodeType(node)) {
                    removeNode(node);
                    return;
                }
                collectNode(node);
            }
            var c = node.childNodes;
            if (c && c.length) removeOrphanedChildren(c, unmountOnly);
        }
    }
    function diffAttributes(dom, vnode) {
        var old = getNodeAttributes(dom) || EMPTY, attrs = vnode.attributes || EMPTY, name = void 0, value = void 0;
        for (name in old) if (empty(attrs[name])) setAccessor(dom, name, null);
        if (attrs !== EMPTY) for (name in attrs) if (hasOwnProperty.call(attrs, name)) {
            value = attrs[name];
            if (!empty(value) && value != getAccessor(dom, name)) setAccessor(dom, name, value);
        }
    }
    function collectComponent(component) {
        var name = component.constructor.name, list = components[name];
        if (list) list.push(component); else components[name] = [ component ];
    }
    function createComponent(Ctor, props, context) {
        var list = components[Ctor.name], len = list && list.length, c = void 0;
        for (var i = 0; len > i; i++) {
            c = list[i];
            if (c.constructor === Ctor) {
                list.splice(i, 1);
                var inst = new Ctor(props, context);
                inst.nextBase = c.base;
                return inst;
            }
        }
        return new Ctor(props, context);
    }
    function triggerComponentRender(component) {
        if (!component._dirty) {
            component._dirty = !0;
            enqueueRender(component);
        }
    }
    function setComponentProps(component, props, opts, context) {
        var d = component._disableRendering;
        component.__ref = props.ref;
        component.__key = props.key;
        delete props.ref;
        delete props.key;
        component._disableRendering = !0;
        if (context) {
            if (!component.prevContext) component.prevContext = component.context;
            component.context = context;
        }
        if (component.base) hook(component, 'componentWillReceiveProps', props, component.context);
        if (!component.prevProps) component.prevProps = component.props;
        component.props = props;
        component._disableRendering = d;
        if (!opts || opts.render !== !1) if (opts && opts.renderSync || options.syncComponentUpdates !== !1) renderComponent(component); else triggerComponentRender(component);
        hook(component, '__ref', component);
    }
    function renderComponent(component, opts) {
        if (!component._disableRendering) {
            var skip = void 0, rendered = void 0, props = component.props, state = component.state, context = component.context, previousProps = component.prevProps || props, previousState = component.prevState || state, previousContext = component.prevContext || context, isUpdate = component.base, initialBase = isUpdate || component.nextBase;
            if (isUpdate) {
                component.props = previousProps;
                component.state = previousState;
                component.context = previousContext;
                if (hook(component, 'shouldComponentUpdate', props, state, context) === !1) skip = !0; else hook(component, 'componentWillUpdate', props, state, context);
                component.props = props;
                component.state = state;
                component.context = context;
            }
            component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
            component._dirty = !1;
            if (!skip) {
                rendered = hook(component, 'render', props, state, context);
                var childComponent = rendered && rendered.nodeName, childContext = component.getChildContext ? component.getChildContext() : context, toUnmount = void 0, base = void 0;
                if (isFunction(childComponent) && childComponent.prototype.render) {
                    var inst = component._component;
                    if (inst && inst.constructor !== childComponent) {
                        toUnmount = inst;
                        inst = null;
                    }
                    var childProps = getNodeProps(rendered);
                    if (inst) setComponentProps(inst, childProps, SYNC_RENDER, childContext); else {
                        inst = createComponent(childComponent, childProps, childContext);
                        inst._parentComponent = component;
                        component._component = inst;
                        if (isUpdate) deepHook(inst, 'componentWillMount');
                        setComponentProps(inst, childProps, NO_RENDER, childContext);
                        renderComponent(inst, DOM_RENDER);
                        if (isUpdate) deepHook(inst, 'componentDidMount');
                    }
                    base = inst.base;
                } else {
                    var cbase = initialBase;
                    toUnmount = component._component;
                    if (toUnmount) cbase = component._component = null;
                    if (initialBase || opts && opts.build) base = diff(cbase, rendered || EMPTY_BASE, childContext);
                }
                if (initialBase && base !== initialBase) {
                    var p = initialBase.parentNode;
                    if (p && base !== p) p.replaceChild(base, initialBase);
                }
                if (toUnmount) unmountComponent(toUnmount, !0);
                component.base = base;
                if (base) {
                    var componentRef = component, t = component;
                    for (;t = t._parentComponent; ) componentRef = t;
                    base._component = componentRef;
                    base._componentConstructor = componentRef.constructor;
                }
                if (isUpdate) hook(component, 'componentDidUpdate', previousProps, previousState, previousContext);
            }
            var cb = component._renderCallbacks, fn = void 0;
            if (cb) for (;fn = cb.pop(); ) fn.call(component);
            return rendered;
        }
    }
    function buildComponentFromVNode(dom, vnode, context) {
        var c = dom && dom._component, oldDom = dom;
        var isOwner = c && dom._componentConstructor === vnode.nodeName;
        for (;c && !isOwner && (c = c._parentComponent); ) isOwner = c.constructor === vnode.nodeName;
        if (isOwner) {
            setComponentProps(c, getNodeProps(vnode), SYNC_RENDER, context);
            dom = c.base;
        } else {
            if (c) {
                unmountComponent(c, !0);
                dom = oldDom = null;
            }
            dom = createComponentFromVNode(vnode, dom, context);
            if (oldDom && dom !== oldDom) {
                oldDom._component = null;
                recollectNodeTree(oldDom);
            }
        }
        return dom;
    }
    function createComponentFromVNode(vnode, dom, context) {
        var props = getNodeProps(vnode);
        var component = createComponent(vnode.nodeName, props, context);
        if (dom && !component.base) component.base = dom;
        setComponentProps(component, props, NO_RENDER, context);
        renderComponent(component, DOM_RENDER);
        return component.base;
    }
    function unmountComponent(component, remove) {
        hook(component, '__ref', null);
        hook(component, 'componentWillUnmount');
        var inner = component._component;
        if (inner) {
            unmountComponent(inner, remove);
            remove = !1;
        }
        var base = component.base;
        if (base) {
            if (remove !== !1) removeNode(base);
            removeOrphanedChildren(base.childNodes, !0);
        }
        if (remove) {
            component._parentComponent = null;
            collectComponent(component);
        }
        hook(component, 'componentDidUnmount');
    }
    function Component(props, context) {
        this._dirty = this._disableRendering = !1;
        this.prevState = this.prevProps = this.prevContext = this.base = this.nextBase = this._parentComponent = this._component = this.__ref = this.__key = this._linkedStates = this._renderCallbacks = null;
        this.context = context || {};
        this.props = props;
        this.state = hook(this, 'getInitialState') || {};
    }
    function render(vnode, parent, merge) {
        var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName, built = diff(merge, vnode), c = !existing && built._component;
        if (c) deepHook(c, 'componentWillMount');
        if (built.parentNode !== parent) parent.appendChild(built);
        if (c) deepHook(c, 'componentDidMount');
        return built;
    }
    var NO_RENDER = {
        render: !1
    };
    var SYNC_RENDER = {
        renderSync: !0
    };
    var DOM_RENDER = {
        build: !0
    };
    var EMPTY = {};
    var EMPTY_BASE = '';
    var HAS_DOM = 'undefined' != typeof document;
    var TEXT_CONTENT = !HAS_DOM || 'textContent' in document ? 'textContent' : 'nodeValue';
    var ATTR_KEY = 'undefined' != typeof Symbol ? Symbol['for']('preactattr') : '__preactattr_';
    var UNDEFINED_ELEMENT = 'undefined';
    var NON_DIMENSION_PROPS = {
        boxFlex: 1,
        boxFlexGroup: 1,
        columnCount: 1,
        fillOpacity: 1,
        flex: 1,
        flexGrow: 1,
        flexPositive: 1,
        flexShrink: 1,
        flexNegative: 1,
        fontWeight: 1,
        lineClamp: 1,
        lineHeight: 1,
        opacity: 1,
        order: 1,
        orphans: 1,
        strokeOpacity: 1,
        widows: 1,
        zIndex: 1,
        zoom: 1
    };
    var isFunction = function(obj) {
        return 'function' == typeof obj;
    };
    var isString = function(obj) {
        return 'string' == typeof obj;
    };
    var hasOwnProperty = {}.hasOwnProperty;
    var empty = function(x) {
        return null == x;
    };
    var falsey = function(value) {
        return value === !1 || null == value;
    };
    var jsToCss = memoize(function(s) {
        return s.replace(/([A-Z])/g, '-$1').toLowerCase();
    });
    var toLowerCase = memoize(function(s) {
        return s.toLowerCase();
    });
    var ch = void 0;
    try {
        ch = new MessageChannel();
    } catch (e) {}
    var setImmediate = ch ? function(f) {
        ch.port1.onmessage = f;
        ch.port2.postMessage('');
    } : setTimeout;
    var options = {
        vnode: function(n) {
            var attrs = n.attributes;
            if (attrs && !isFunction(n.nodeName)) {
                var p = attrs.className;
                if (p) {
                    attrs['class'] = p;
                    delete attrs.className;
                }
                if (attrs['class']) normalize(attrs, 'class', hashToClassName);
                if (attrs.style) normalize(attrs, 'style', styleObjToCss);
            }
        }
    };
    var SHARED_TEMP_ARRAY = [];
    var items = [];
    var itemsOffline = [];
    var normalizeEventName = memoize(function(t) {
        return t.replace(/^on/i, '').toLowerCase();
    });
    var nodes = {};
    var normalizeName = memoize(function(name) {
        return name.toUpperCase();
    });
    var components = {};
    extend(Component.prototype, {
        linkState: function(key, eventPath) {
            var c = this._linkedStates || (this._linkedStates = {}), cacheKey = key + '|' + (eventPath || '');
            return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
        },
        setState: function(state, callback) {
            var s = this.state;
            if (!this.prevState) this.prevState = clone(s);
            extend(s, isFunction(state) ? state(s, this.props) : state);
            if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
            triggerComponentRender(this);
        },
        forceUpdate: function() {
            renderComponent(this);
        },
        render: function() {
            return null;
        }
    });
    var preact = {
        h: h,
        Component: Component,
        render: render,
        rerender: rerender,
        options: options,
        hooks: options
    };
    return preact;
});

},{}],10:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}]},{},[8]);
