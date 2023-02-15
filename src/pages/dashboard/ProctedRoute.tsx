import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../auth/authContext'
import type { AuthContextModel } from '../../auth/authContext'

const ProctedRoute = ({ children }: PropsWithChildren): JSX.Element => {
  const { user, isLoading } = useAuth() as AuthContextModel

  if (isLoading) return <h1>Cargando</h1>

  if (user === null)
    return (
      <>
        <h1>No hay usuario autenticado, siendo redireccionado</h1>
        <Navigate to='/login' />
      </>
    )

  return <>{children}</>
}

export default ProctedRoute