import { getDoc, updateDoc, doc, type DocumentData } from 'firebase/firestore'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { db, updateloadFile } from '../../../firebase/conection'
import { getDownloadURL } from 'firebase/storage'
import { useNavigate, useParams } from 'react-router-dom'
import type React from 'react'
import { useState, useEffect } from 'react'
import {
  Button,
  GroupForm,
  LoginDiv,
} from '../../../assets/styled-components/login/Login'
import { FormAdd } from '../../../assets/styled-components/dashboard/sub/AddItem'

interface Inputs {
  image: FileList
  link: string
  nameP: string
  category: string
  description: string
}

const EditItem = (): JSX.Element => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [previewImg, setPreviewImg] = useState<string | null>(null)
  const [validationImg, setValidationImg] = useState(false)
  const [itemIdImg, setIdUrlImg] = useState<DocumentData | string>()
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm<Inputs>()

  useEffect(() => {
    const getItem = async (id: string): Promise<void> => {
      const data = await getDoc(doc(db, 'item', id))
      if (data.exists()) {
        setIdUrlImg(data.data().deleteImage as string)
        setPreviewImg(data.data().imageUrl as string)
        setValue('link', data.data().url as string)
        setValue('nameP', data.data().title as string)
        setValue('category', data.data().category as string)
        setValue('description', data.data().description as string)
      } else {
        console.log('no existe')
      }
    }
    if (id !== undefined) {
      void getItem(id)
    }
  }, [id, setValue])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files
    if (file != null) {
      const imageFile = file[0]
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setPreviewImg(result)
      }
      reader.readAsDataURL(imageFile)
    }
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (
      data.image[0].type !== 'image/jpeg' &&
      data.image[0].type !== 'image/png'
    ) {
      setValidationImg(true)
    } else {
      try {
        if (id !== undefined && itemIdImg !== undefined) {
          const snapshot = await updateloadFile(
            data.image[0],
            itemIdImg as string
          )
          const idImage = snapshot.metadata.fullPath
          const getURl = await getDownloadURL(snapshot.ref)
          const item = doc(db, 'item', id)
          await updateDoc(item, {
            url: data.link,
            title: data.nameP,
            category: data.category,
            description: data.description,
            imageUrl: getURl,
            deleteImage: idImage,
          })
          reset()
          navigate('/dashboard')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  return (
    <LoginDiv>
      <FormAdd onSubmit={handleSubmit(onSubmit)}>
        <h1>Editar item</h1>
        <GroupForm>
          {previewImg != null && (
            <div>
              <img src={previewImg} alt='preview' />
            </div>
          )}
          <input
            type='file'
            {...register('image', {
              required: true,
            })}
            onChange={handleImage}
          />
          {validationImg && (
            <p>Formato de imagen no v??lido, solo suba jpg/png</p>
          )}
          {errors.image?.type === 'required' && <p>La imagen es requerida</p>}
        </GroupForm>
        <GroupForm>
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
          {errors.link?.type === 'pattern' && <p>Ingrese un enlace v??lido</p>}
        </GroupForm>
        <GroupForm>
          <label htmlFor='nameP'>Nombre del proyecto</label>
          <input
            type='text'
            {...register('nameP', {
              required: true,
              pattern: /^[ a-zA-Z???????????????????????? ]+$/i,
            })}
          />
          {errors.nameP?.type === 'required' && (
            <p>El nombre del proyecto es requerido</p>
          )}
          {errors.nameP?.type === 'pattern' && <p>Solo incluya letras</p>}
        </GroupForm>
        <GroupForm>
          <label htmlFor='pass'>Categor??a</label>
          <input
            type='text'
            {...register('category', {
              required: true,
              pattern: /^[ a-zA-Z???????????????????????? ]+$/i,
            })}
            placeholder='Dise??o UX...'
          />
          {errors.category?.type === 'required' && (
            <p>La categor??a es requerida</p>
          )}
          {errors.category?.type === 'pattern' && <p>Solo incluya letras</p>}
        </GroupForm>
        <GroupForm>
          <label htmlFor='pass'>Descripci??n</label>
          <textarea
            {...register('description', {
              required: true,
              pattern: /^[ a-zA-Z???????????????????????? ]+$/i,
            })}
            placeholder='Escribe una descripci??n'
          />
          {errors.description?.type === 'required' && (
            <p>La descripci??n es requerida</p>
          )}
          {errors.description?.type === 'pattern' && <p>Solo incluya letras</p>}
        </GroupForm>
        <Button type='submit'>Agregar</Button>
      </FormAdd>
    </LoginDiv>
  )
}

export default EditItem
