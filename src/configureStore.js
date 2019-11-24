import { createStore, applyMiddleware, compose } from 'redux';
// import ReduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';

// Import the state interface and our combined reducers.
import createRootReducer from './store';

export default function configureStore(
  initialState,
  history
) {
  // We'll create our store with the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        // ReduxThunk, 
        routerMiddleware(history)
      )
    ),
  );
  return store;
}
