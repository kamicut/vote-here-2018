import 'whatwg-fetch';

import {h, render, Component} from 'preact';
import MapboxMap from './components/MapboxMap.js';
import Nav from './components/Nav';
import Router from 'preact-router';
import GlobalForm from './containers/GlobalForm';
import LocalForm from './containers/LocalForm';
import createHashHistory from 'history/createHashHistory';
import labels from './i18n.json';
import linkState from 'linkstate';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: null,
      error: '',
      lang: 'ar',
    };
  }

  render(props, state) {
    return h(
      'div', { id: 'app' },
      h(MapboxMap, { center: state.center }),
      h('div', { id: 'main', class: (state.lang === 'ar' ? '' : 'override') },
        h(Nav, { lang: state.lang, setLang: linkState(this, 'lang')}),
        h(Router, {history: createHashHistory()},
          h('div', {path: '/'}, h('h1', {}, 'ROOT')),
          h(GlobalForm, {
            id: 'global-form',
            path: '/global',
            lang: state.lang,
            setCoordinates: linkState(this, 'center')
          }),
          h(LocalForm, {
            id: 'local-form',
            path: '/:district',
            lang: state.lang,
            center: state.center,
            setCoordinates: linkState(this, 'center'),
            changeError: linkState(this, 'error'),
          }),
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
