import { collection, addDoc } from 'firebase/firestore'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { db, storage } from '../../../firebase/conection'
import { ref, uploadBytes } from 'firebase/storage'

interface Inputs {
  image: FileList
  link: string
  nameP: string
  category: string
  description: string
}

const AddItem = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>()

  const itemCollection = collection(db, 'item')

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const storageRef = ref(storage, data.image[0].name)
    const file = data.image[0]
    const fileBlob = new Blob([file], { type: file.type })
    try {
      await addDoc(itemCollection, {
        url: data.link,
        title: data.nameP,
        category: data.category,
        description: data.description,
      })
      await uploadBytes(storageRef, fileBlob)
      reset()
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div></div>
          <input
            type='file'
            {...register('image', {
              required: true,
              pattern: /^[A-Za-z0-9.-_]+@[A-Za-z]+\.[A-Za-z]+$/i,
            })}
          />
          {errors.image?.type === 'required' && <p>La imagen es requerida</p>}
        </div>
        <div>
          <label htmlFor='link'>Enlace al portafolio</label>
          <input
            type='text'
            {...register('link', {
              required: true,
              pattern: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/i,
            })}
            placeholder='https://www.page.domain/item'
          />
          {errors.link?.type === 'required' && <p>El enlace es requerido</p>}
          {errors.link?.type === 'pattern' && <p>Ingrese un enlace válido</p>}
        </div>
        <div>
          <label htmlFor='nameP'>Nombre del proyecto</label>
          <input
            type='text'
            {...register('nameP', {
              required: true,
              pattern: /^[ a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/i,
            })}
          />
          {errors.nameP?.type === 'required' && (
            <p>El nombre del proyecto es requerido</p>
          )}
          {errors.nameP?.type === 'pattern' && <p>Solo incluya letras</p>}
        </div>
        <div>
          <label htmlFor='pass'>Categoría</label>
          <input
            type='text'
            {...register('category', {
              required: true,
              pattern: /^[ a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/i,
            })}
            placeholder='Diseño UX...'
          />
          {errors.category?.type === 'required' && (
            <p>La categoría es requerida</p>
          )}
          {errors.category?.type === 'pattern' && <p>Solo incluya letras</p>}
        </div>
        <div>
          <label htmlFor='pass'>Descripción</label>
          <input
            type='text'
            {...register('description', {
              required: true,
              pattern: /^[ a-zA-ZÑñáéíóúÁÉÍÓÚ ]+$/i,
            })}
            placeholder='Escribe una descripción'
          />
          {errors.description?.type === 'required' && (
            <p>La descripción es requerida</p>
          )}
          {errors.description?.type === 'pattern' && <p>Solo incluya letras</p>}
        </div>
        <button type='submit'>Agregar</button>
      </form>
    </>
  )
}

export default AddItem
