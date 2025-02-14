import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
import { api } from './middlewares';

const loggerMiddleware = createLogger({
  collapsed: true,
});
let middleWares = [thunkMiddleWare, api, loggerMiddleware];

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
  middleWares = [thunkMiddleWare, api];
}

export function configureStore(initialState = {}) {
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleWares)));
}

const store = configureStore();

export default store;
