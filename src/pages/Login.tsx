import { useForm, type SubmitHandler } from 'react-hook-form'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/authContext'
import type { AuthContextModel } from '../auth/authContext'

interface Inputs {
  email: string
  pass: string
}

const Login = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>()

  const [errAuth, setAuth] = useState({ err: false, msg: '' })
  const navigate = useNavigate()
  const { signIn } = useAuth() as AuthContextModel

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await signIn(data.email, data.pass)
      setAuth({ err: false, msg: 'Iniciando sesión' })
      navigate('/dashboard')
    } catch (e) {
      setAuth({ err: true, msg: handleErrors(e) })
    }
  }

  const handleErrors = (e: unknown): string => {
    const err = e instanceof FirebaseError
    
    if (err) {
      const msg =
        e.code === 'auth/user-not-found'
          ? 'Correo incorrecto'
          : e.code === 'auth/wrong-password'
          ? 'Contraseña incorrecta'
          : e.code === 'auth/network-request-failed'
          ? 'Error de red, vuelva a conectarse y recargar esta pagina'
          : 'Iniciando sesión'
      return msg
    }
    return 'Iniciando sesión'
  }

  return (
    <>
      {errAuth.err ? <p>{errAuth.msg}</p> : <p>{errAuth.msg}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>Correo</label>
          <input
            type='text'
            {...register('email', {
              required: true,
              pattern: /^[A-Za-z0-9.-_]+@[A-Za-z]+\.[A-Za-z]+$/i,
            })}
            placeholder='Escribe tu correo'
          />
          {errors.email?.type === 'required' && <p>El correo es requerido</p>}
          {errors.email?.type === 'pattern' && <p>Ingrese un correo válido</p>}
        </div>
        <div>
          <label htmlFor='pass'>Contraseña</label>
          <input
            type='password'
            {...register('pass', {
              required: true,
            })}
            placeholder='Escribe tu contraseña'
          />
          {errors.pass?.type === 'required' && (
            <p>La contraseña es requerida</p>
          )}
        </div>
        <button type='submit'>Iniciar sesión</button>
      </form>
    </>
  )
}

export default Login
