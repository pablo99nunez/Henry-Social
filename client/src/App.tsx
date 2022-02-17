import React from 'react'
import Login from './Pages/Login/Login'
import Home from './Pages/Home/Home'
import { Routes,Route } from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
      </Routes>
    </div>
  )
}

export default App;