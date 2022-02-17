import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './Pages/Login'
import ModalAddPost from './Pages/ModalAddPost';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Login></Login>
      <ModalAddPost></ModalAddPost>
    </div>
  )
}

export default App
