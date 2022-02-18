import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.scss';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/store'


ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)