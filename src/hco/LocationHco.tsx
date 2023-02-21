import { useLocation } from 'react-router-dom'
import NavBar from '../components/navbar/NavBar'
import Footer from '../components/Footer'
import type { ComponentType } from 'react'

const withRender = (Component: ComponentType<any>): ComponentType<any> => {
  const WrapedComponent = (): JSX.Element => {
    const { pathname } = useLocation()
    const location = window.location.pathname
    const id = location.split('/edit/')[1]
    const pathnameExclude = ['/login', '/dashboard', '/additem', `/edit/${id}`]
    return <>{!pathnameExclude.includes(pathname) && <Component />}</>
  }

  return WrapedComponent
}

export const NavBarwithRender = withRender(NavBar)
export const FooterwithRender = withRender(Footer)
