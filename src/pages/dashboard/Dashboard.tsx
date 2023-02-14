import { useAuth } from '../../auth/authContext'
import type { AuthContextModel } from '../../auth/authContext'
import Msg from './Msg'
import Init from './Init'

const Dashboard = (): JSX.Element => {
  const { isExistUser, isLoading } = useAuth() as AuthContextModel
  if (isLoading) return <h1>Cargando</h1>
  return (
      isExistUser ? <Init /> : <Msg />
  )
}

export default Dashboard
