import 'whatwg-fetch';

import {h, render, Component} from 'preact';
import MapboxMap from './components/MapboxMap.js';
import Nav from './components/Nav';
import Router from 'preact-router';
import GlobalForm from './containers/GlobalForm';
import createHashHistory from 'history/createHashHistory';
import labels from './i18n.json';

/**
 * Checks if the entered values exist in the index
 * @param {Object} index
 * @param {Object} entry
 * @returns {Object[]} list of matching polling stations
 */
function checkInIndex(index, entry) {
  let { sect, subdistrict, gender, val } = entry;
  var fromIndex = index[sect][subdistrict][gender];
  return fromIndex.filter((row) => {
    return Number(row.from) <= Number(val) &&
      Number(val) <= Number(row.to);
  });
}


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: null,
      error: '',
      lang: 'ar',
    };
  }

  returnToForm() {
    this.setState({selected: false});
  }

  setLang(lang) {
    this.setState({lang: lang});
  }

  setCoordinates(center) {
    this.setState({
      center
    });
  }

  render(props, state) {
    return h(
      'div', { id: 'app' },
      h(MapboxMap, { center: state.center }),
      h('div', { id: 'main', class: (state.lang === 'ar' ? '' : 'override') },
        h(Nav, { lang: state.lang, setLang: this.setLang.bind(this)}),
        h(Router, {history: createHashHistory()},
          h('div', {path: '/'}, h('h1', {}, 'ROOT')),
          h(GlobalForm, { id: 'global-form', path: '/global', lang: state.lang, setCoordinates: this.setCoordinates.bind(this) }),
        ),
        h('div', { id: 'errors' }, state.error),
        (!state.selected ?
          h('footer', {},
            h('hr'),
            h('div', {}, labels[state.lang].labels.check_your_status,
              ': ',
              h('a', { 'href': "http://www.dgps.gov.lb/goelect2/index.php", "target": "_blank" }, labels[state.lang].about.link)
            ),
            h('br'),
            h('div', {}, labels[state.lang].about.problems,
              h('span', {}, ' '),
              h('a', { 'href': "https://github.com/kamicut/vote-here-2018", "target": "_blank" }, labels[state.lang].about.link)
            ),
          ) : h('div')
        )
      )
    );
  }
}

render(h(App), document.body);
