import PostDetail from './Pages/PostDetail/PostDetail'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/post/:id' element={<PostDetail/>}/>
    </Routes>
  )
}

export default App
