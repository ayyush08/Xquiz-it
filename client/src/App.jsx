import { lazy, Suspense } from 'react'
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Home = lazy(() => import('./pages/Home'))
const Questions = lazy(() => import('./components/Question'))
function App() {

  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <Router>
      <Routes>
        <Route element={<SharedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/questions" element={<Questions />} />
        </Route>
      </Routes>
    </Router>
    </Suspense>
    </>
  )
}

export default App
