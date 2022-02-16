import React, { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import User from './components/User/User'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <React.Fragment>
      <Routes>
        <Route path='/' element={<User/>}/>
      </Routes>
    </React.Fragment>
  )
}

export default App
