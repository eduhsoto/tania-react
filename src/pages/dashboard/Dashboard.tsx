import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/authContext'
import type { AuthContextModel } from '../../auth/authContext'

const Dashboard = (): JSX.Element => {
  const { logOut } = useAuth() as AuthContextModel
  const navigate = useNavigate()

  const handleLogout = async (): Promise<void> => {
    await logOut()
    navigate('/login')
  }

  return (
    <div>
      <h1>Hola Tania</h1>
      <div>
        <Link to='/create'>Crear nuevo item</Link>
        <button>
          <img src='/img/tania-profile.png' alt='tania profile' />
        </button>
        <div>
          <ul>
            <li>
              <Link to='/settigs'>Configuración</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
      <h1>Dashboard</h1>
      <div></div>
    </div>
  )
}

export default Dashboard
