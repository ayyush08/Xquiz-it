import { lazy, Suspense } from 'react'
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Home = lazy(() => import('./pages/Home'))
const Questions = lazy(() => import('./components/Question'))
const Profile = lazy(()=>import('./pages/Profile'))
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
        <Route path="/quiz" element={<Questions />} />
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
    </Suspense>
    </>
  )
}

export default App
