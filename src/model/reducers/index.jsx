import { combineReducers } from 'redux';
import countryProvincies from './provinces';
import covidReducer from './covidData';
import regionsReducer from './regions'
const reducers = combineReducers({ countryProvincies, covidReducer, regionsReducer });

export default reducers;
