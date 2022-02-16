import {Routes, Route} from 'react-router-dom'
import User from './components/User/User'
import './App.css'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<User/>}/>  {/*path='/user/:id'  ==> Ver si el id corresponde*/}
      </Routes>
      </div>
  )
}

export default App
