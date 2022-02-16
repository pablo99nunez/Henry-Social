
import './App.css'
import Login from './Pages/Login'
import { Routes,Route } from 'react-router-dom'

function App() {
 
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  )
}

export default App
