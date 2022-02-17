import PostDetail from './components/PostDetail/PostDetail'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/post/:id' element={<PostDetail/>}/> */}
        <Route path='/' element={<PostDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
