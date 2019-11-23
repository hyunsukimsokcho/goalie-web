import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

// Import the state interface and our combined reducers.
import { createRootReducer } from './store';

export default function configureStore(
  history,
  initialState
) {
  // We'll create our store with the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    createRootReducer(history),
    initialState,
    applyMiddleware(ReduxThunk),
  );
  return store;
}
