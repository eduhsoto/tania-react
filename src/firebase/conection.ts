// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import type { UploadResult } from 'firebase/storage'
import { v4 } from 'uuid'

const {
  REACT_APP_APIKEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESAGGEID,
  REACT_APP_APPID,
  REACT_APP_MESID,
} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_APIKEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESAGGEID,
  appId: REACT_APP_APPID,
  measurementId: REACT_APP_MESID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export const uploadFile = async (file: Blob): Promise<UploadResult> => {
  const storageRef = ref(storage, v4())
  return await uploadBytes(storageRef, file)
}

export const updateloadFile = async (
  file: Blob,
  idImg: string
): Promise<UploadResult> => {
  const storageRef = ref(storage, idImg)
  return await uploadBytes(storageRef, file)
}
