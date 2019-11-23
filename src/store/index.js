import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import reducer from '../redux';

export const createRootReducer = history =>
  combineReducers({
    reducer,
    router: connectRouter(history),
  });
