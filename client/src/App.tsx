import Login from './Pages/Login/Login'
import { Route, Routes } from 'react-router'
import './App.css'

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
