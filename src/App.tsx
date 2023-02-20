import { Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar/NavBar'
import Home from './pages/Home'
import Path from './pages/Path'
import Portafolio from './pages/Portafolio'
import Footer from './components/Footer'
import './assets/index.css'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import { AuthProvider } from './auth/authContext'
import ProctedRoute from './pages/dashboard/ProctedRoute'
import AddItem from './pages/dashboard/sub/AddItem'
import EditItem from './pages/dashboard/sub/EditItem'

const App = (): JSX.Element => {
  return (
    <>
      <NavBar />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/my-path' element={<Path />} />
          <Route path='/portafolio' element={<Portafolio />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
          <Route
            path='/dashboard'
            element={
              <ProctedRoute>
                <Dashboard />
              </ProctedRoute>
            }
          />
          <Route
            path='/additem'
            element={
              <ProctedRoute>
                <AddItem />
              </ProctedRoute>
            }
          />
          <Route
            path='/edit/:id'
            element={
              <ProctedRoute>
                <EditItem />
              </ProctedRoute>
            }
          />
        </Routes>
      </AuthProvider>
      <Footer />
    </>
  )
}

export default App
