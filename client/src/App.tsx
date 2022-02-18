import React from 'react'

import { Route, Routes } from 'react-router-dom'

import User from './components/User/User'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import PostDetail from './Pages/PostDetail/PostDetail'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path='/profile/:username' element={<User/>}></Route>
        <Route path='/post/:id' element={<PostDetail/>}/>
      </Routes>
    </div>
  )
}

export default App;