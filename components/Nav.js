import { h } from 'preact';

export default ({ lang, setLang }) => {
  return h('header', { class: 'nav' },
    h('div',
      { id: 'lang-selector' },
      h('a', {
        class: 'lang-btn' + (lang === 'ar' ? ' lang-btn-bold' : ''),
        onClick: () => setLang('ar')
      }, 'AR'),
      ' | ',
      h('a', {
        class: 'lang-btn' + (lang === 'en' ? ' lang-btn-bold' : ''),
        onClick: () => setLang('en')
      }, 'EN'),
    ),
    h('a', {
      style: {
        display: 'inline-block',
        float: 'right',
        right: 0
      },
      href: "/"
    }, 'HOME')
  );
}