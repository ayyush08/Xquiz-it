import { lazy, Suspense } from 'react'
import { Route,Routes, BrowserRouter as Router } from 'react-router-dom'
import SharedLayout from './components/SharedLayout'
import Loader from './components/Loader'



const Login = lazy(() => import('./pages/Login'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Home = lazy(() => import('./pages/Home'))
const Questions = lazy(() => import('./components/Question'))
const Profile = lazy(()=>import('./pages/Profile'))

const Loading = () => {
  return <div className=' flex justify-center items-center min-w-full min-h-[80vh]'>
                <Loader />
            </div>
}
function App() {

  return (
    <>
    <Suspense fallback={<Loading/>}>
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
