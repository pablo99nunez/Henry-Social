import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer/index';
import { createStore, applyMiddleware, compose } from 'redux';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default Store;
