import React from 'react';
import Routes from './routes';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getBrowserLanguageCode, metaTagContents } from './utils';
import Helmet from 'react-helmet';

const App = ({ store, history }) => {
  return (
    <Provider store={store}>
      <Helmet>
        <title>
          {getBrowserLanguageCode() === 'ko'
            ? metaTagContents.title.ko
            : metaTagContents.title.en}
        </title>
        <meta
          name="title"
          content={
            getBrowserLanguageCode() === 'ko'
              ? metaTagContents.title.ko
              : metaTagContents.title.en
          }
        />
        <meta
          name="description"
          content={
            getBrowserLanguageCode() === 'ko'
              ? metaTagContents.description.ko
              : metaTagContents.description.en
          }
        />
        <meta property="og:title" content="meta title for fb" />
        <meta
          property="og:description"
          content={
            getBrowserLanguageCode() === 'ko'
              ? metaTagContents.description.ko
              : metaTagContents.description.en
          }
        />
      </Helmet>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
