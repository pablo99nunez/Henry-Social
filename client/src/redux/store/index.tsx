import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer/index';
import { createStore, applyMiddleware, compose } from 'redux';

const Store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default Store;
