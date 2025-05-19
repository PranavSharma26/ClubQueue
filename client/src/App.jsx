import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { UserSignin } from './pages/user/userSignin'
import { PageNotFound } from './pages/PageNotFound'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signin/user' element={<UserSignin/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
