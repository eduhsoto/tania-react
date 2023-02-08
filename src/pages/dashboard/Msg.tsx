import { useNavigate } from 'react-router-dom'

const Msg = (): JSX.Element => {
  const navigate = useNavigate()
  const redirectLogin = (): void => {
    navigate('/login')
  }
  return (
    <>
      <h1>Inicia sesión primero para comenzar a crear</h1>
      <button onClick={redirectLogin}>Iniciar sesión</button>
    </>
  )
}

export default Msg
