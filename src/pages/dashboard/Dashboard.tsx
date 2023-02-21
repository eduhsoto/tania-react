import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/authContext'
import type { AuthContextModel } from '../../auth/authContext'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db, storage } from '../../firebase/conection'
import { useEffect, useState } from 'react'
import { deleteObject, ref } from 'firebase/storage'

interface itemType {
  id: string
  url: string
  title: string
  category: string
  description: string
  imageUrl: string
  deleteImage: string
}

const Dashboard = (): JSX.Element => {
  const { logOut } = useAuth() as AuthContextModel
  const navigate = useNavigate()
  const [items, setItem] = useState<itemType[]>([])

  const handleLogout = async (): Promise<void> => {
    await logOut()
    navigate('/login')
  }

  const itemCollection = collection(db, 'item')

  const deleteItem = async (id: string, deleteImage: string): Promise<void> => {
    if (
      window.confirm('¿Estas segura de eliminar los datos de este item?')
    ) {
      const item = doc(db, 'item', id)
      const deleteImg = ref(storage, deleteImage)
      await deleteDoc(item)
      await deleteObject(deleteImg)
    }
  }

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
    <div>
      <h1>Hola Tania</h1>
      <div>
        <Link to='/additem'>Crear nuevo item</Link>
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
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Enlace del proyecto</th>
                <th>Nombre del proyecto</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imageUrl} alt='post' />
                    </td>
                    <td>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Enlace
                      </a>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>
                      <Link to={`/edit/${item.id}`}>Editar</Link>
                      <button
                        onClick={async () => {
                          await deleteItem(item.id, item.deleteImage)
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
