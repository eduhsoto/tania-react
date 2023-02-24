import { Link, useNavigate } from 'react-router-dom'
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase/conection'
import { deleteObject, ref } from 'firebase/storage'
import { useAuth, type AuthContextModel } from '../../context/authContext'
import { type DocsContextModel, useDocs } from '../../context/getDocsContext'
import { H1, LinkEdit, Table, TopNav, Wrapper } from '../../assets/styled-components/dashboard/Dashboard'

const Dashboard = (): JSX.Element => {
  const { logOut } = useAuth() as AuthContextModel
  const navigate = useNavigate()
  const { items } = useDocs() as DocsContextModel

  const handleLogout = async (): Promise<void> => {
    if (window.confirm('¿Estas segura de cerrar sesión?')) {
      await logOut()
      navigate('/login')
    }
  }

  const deleteItem = async (id: string, deleteImage: string): Promise<void> => {
    if (window.confirm('¿Estas segura de eliminar los datos de este item?')) {
      const item = doc(db, 'item', id)
      const deleteImg = ref(storage, deleteImage)
      await deleteDoc(item)
      await deleteObject(deleteImg)
    }
  }

  return (
    <div>
      <TopNav>
        <h1>Hola Tania</h1>
        <Link to='/additem'>Crear nuevo item</Link>
        <div>
          {/* <img src='/img/tania-profile.png' alt='tania profile' /> */}
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </TopNav>
      <Wrapper>
        <Table>
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
                    <LinkEdit to={`/edit/${item.id}`}>Editar</LinkEdit>
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
        </Table>
      </Wrapper>
      <Link to='/portafolio'>
        <H1>Ver en portafolio</H1>
      </Link>
    </div>
  )
}

export default Dashboard
