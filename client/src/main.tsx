import './index.css'
import App from './App'
// import store from './redux/store'
import { StrictMode } from 'react'
import { render } from 'react-dom'
// import { Provider } from 'react-redux'

render(
  // <Provider store={store} >
    <StrictMode>
      <App />
    </StrictMode>,
  // </Provider>,
  document.getElementById('root')
)