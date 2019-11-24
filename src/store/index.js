import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import reducer from '../redux';

const createRootReducer = history =>
  combineReducers({
    // reducer,
    router: connectRouter(history)
  });
export default createRootReducer;