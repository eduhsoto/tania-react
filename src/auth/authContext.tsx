import { createContext, useContext, useEffect, useState } from 'react'
import type { RouteProps } from 'react-router-dom'
import type React from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import type { Auth, User, UserCredential } from 'firebase/auth'
import { auth } from '../firebase/conection'

export interface AuthContextModel {
  auth: Auth
  user: User | null
  isExistUser: boolean
  isLoading: boolean
  signIn: (email: string, pass: string) => Promise<UserCredential>
  logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextModel | null>(null)

export const useAuth = (): AuthContextModel | null => {
  const context = useContext(AuthContext)
  return context
}

export const AuthProvider = ({ children }: RouteProps): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null)
  const [isExistUser, setExistsUser] = useState(false)
  const [isLoading, setLoading] = useState(true)

  const signIn = async (
    email: string,
    pass: string
  ): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, pass)
  }

  const logOut = async (): Promise<void> => {
    await signOut(auth)
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((currentUser) => {
      setLoading(false)
      if (currentUser !== null) {
        setExistsUser(true)
        setUser(currentUser)
      } else {
        setExistsUser(false)
      }
    })

    return () => {
      unsuscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ auth, user, signIn, logOut, isExistUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
