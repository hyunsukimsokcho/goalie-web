import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './serviceWorker';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

import { IntlProvider } from 'react-intl';

import messages_ko from './translations/ko.json';
import messages_en from './translations/en.json';

const providingLanguage = {
  en: 'en',
  ko: 'ko',
};

const messages = {
  ko: messages_ko,
  en: messages_en,
  undefined: messages_en,
};

const language = navigator.language.split(/[-_]/)[0];

const history = createBrowserHistory();
const initialState = window.initialReduxState;
const store = configureStore(initialState, history);

ReactDOM.render(
  <IntlProvider
    locale={language in providingLanguage ? language : 'en'}
    messages={messages[providingLanguage[language]]}
  >
    <App store={store} history={history} />
  </IntlProvider>,
  document.getElementById('root'),
);

// TODO: Add serviceWorker, there is a weird bug with import.

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// register();
unregister();
