import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer/reducer'


const Store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);

export default Store;
 