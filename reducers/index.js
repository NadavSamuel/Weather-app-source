import { combineReducers } from 'redux';
import systemReducer from './systemReducer';
import { weatherReducer } from './weatherReducer';

const rootReducer = combineReducers({
  systemReducer: systemReducer,
  weatherReducer: weatherReducer,
})

export default rootReducer;