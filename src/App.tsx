import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Path from './pages/Path'
import Portafolio from './pages/Portafolio'
import './assets/index.css'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import ProctedRoute from './pages/dashboard/ProctedRoute'
import AddItem from './pages/dashboard/sub/AddItem'
import EditItem from './pages/dashboard/sub/EditItem'
import { FooterwithRender, NavBarwithRender } from './hco/LocationHco'
import { AuthProvider } from './context/authContext'
import { DocsProvider } from './context/getDocsContext'

const App = (): JSX.Element => {
  return (
    <>
      <NavBarwithRender />
      <AuthProvider>
        <DocsProvider>
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
        </DocsProvider>
      </AuthProvider>
      <FooterwithRender />
    </>
  )
}

export default App
