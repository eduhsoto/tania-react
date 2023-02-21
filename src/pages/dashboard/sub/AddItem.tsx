import { collection, addDoc } from 'firebase/firestore'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { db, uploadFile } from '../../../firebase/conection'
import { getDownloadURL } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import type React from 'react'
import { useState } from 'react'

interface Inputs {
  image: FileList
  link: string
  nameP: string
  category: string
  description: string
}

const AddItem = (): JSX.Element => {
  const navigate = useNavigate()
  const [visibleImg, setVisible] = useState<string | null>(null)
  const [validationImg, setValidationImg] = useState(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>()

  const itemCollection = collection(db, 'item')

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files
    if (file != null) {
      const imageFile = file[0]
      console.log(imageFile)
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setVisible(result)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if(data.image[0].type !== 'image/jpeg' && data.image[0].type !== 'image/png'){
      setValidationImg(true)
    }else{
      try {
        const snapshot = await uploadFile(data.image[0])
        const idImage = snapshot.metadata.fullPath
        const getURl = await getDownloadURL(snapshot.ref)
        await addDoc(itemCollection, {
          url: data.link,
          title: data.nameP,
          category: data.category,
          description: data.description,
          imageUrl: getURl,
          deleteImage: idImage,
        })
        reset()
        navigate('/dashboard')
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {visibleImg != null && (
            <div>
              <img src={visibleImg} alt='preview' />
            </div>
          )}
          <input
            type='file'
            {...register('image', {
              required: true,
              pattern: /^[A-Za-z0-9.-_]+@[A-Za-z]+\.[A-Za-z]+$/i,
            })}
            onChange={handleImage}
          />
          {validationImg && <p>Formato de imagen no válido, solo suba jpg/png</p>}
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
