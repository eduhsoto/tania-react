import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/conection";
import type { RouteProps } from 'react-router-dom'

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

  export const useDocs = () : DocsContextModel | null => {
    const context = useContext(DocsContext)

    return context
  } 

  export const DocsProvider = ({children} : RouteProps) : React.ReactElement => {
    const [items, setItem] = useState<itemType[]>([])

    const itemCollection = collection(db, 'item')

    useEffect(() => {
        const getItem = async (): Promise<void> => {
          const data = await getDocs(itemCollection)
          const itemData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          })) as itemType[]
          setItem(itemData)
        }
        void getItem()
      }, [itemCollection])

      return (
        <DocsContext.Provider value={{items}}>{children}</DocsContext.Provider>
      )
  }