import Head from '../components/Head'
import Item from '../components/portafolio/Item'
import { type DocsContextModel, useDocs } from '../context/getDocsContext'

const Portafolio = (): JSX.Element => {
  const { items } = useDocs() as DocsContextModel
  return (
    <>
      <Head
        img='/img/experience.jpg'
        title='Mi experiencia es laboral y académica, dale un vistazo a mis proyectos!'
        paragraph='Al trabajar para una empresa dedicada a la creación de soluciónes digitales pude obtener mi paión por el deseño UX / UI'
        reverse={false}
      />
      <section>
        <div className='container'>
          {items.map((item) => {
            return (
              <Item
                key={item.id}
                link={item.url}
                img={item.imageUrl}
                title={item.title}
                category={item.category}
                paragraph={item.description}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Portafolio
