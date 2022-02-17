import App from './App'
import './Styles/index.scss'
// import store from './redux/store'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux'

render(
  // <Provider store={store} >
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  // </Provider>,
  document.getElementById('root')
)