import { collection, onSnapshot } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../firebase/conection'
import { type RouteProps, useLocation } from 'react-router-dom'

interface itemType {
  id: string
  url: string
  title: string
  category: string
  description: string
  imageUrl: string
  deleteImage: string
}

export interface DocsContextModel {
  items: itemType[]
}

const DocsContext = createContext<DocsContextModel | null>(null)

export const useDocs = (): DocsContextModel | null => {
  const context = useContext(DocsContext)

  return context
}

export const DocsProvider = ({ children }: RouteProps): React.ReactElement => {
  const [items, setItem] = useState<itemType[]>([])
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/dashboard' || pathname === '/portafolio') {
      const unsuscribe = onSnapshot(collection(db, 'item'), (query) => {
        const itemData = query.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as itemType[]
        setItem(itemData)
        console.log('consultado')
      })
      return unsuscribe
    }
  }, [pathname])

  return (
    <DocsContext.Provider value={{ items }}>{children}</DocsContext.Provider>
  )
}
