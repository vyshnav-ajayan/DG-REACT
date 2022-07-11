import { createStore,combineReducers,compose, applyMiddleware } from 'redux';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import sagas from '../saga';

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

const middleware = [sagaMiddleware,logger];
const enhancers = [applyMiddleware(...middleware)];


const reducers = combineReducers(rootReducer);
const store = createStore(reducers,{},compose(...enhancers));

sagaMiddleware.run(sagas);
export default store;
