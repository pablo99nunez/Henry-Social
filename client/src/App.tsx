import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import './reset.scss';
import Login from './Pages/Login';

import Posts from './components/Posts/Posts'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      {/* <Login></Login> */}
      <Posts />
    </div>
  )
}

export default App
