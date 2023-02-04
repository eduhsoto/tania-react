// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from 'firebase/storage'


const { REACT_APP_APIKEY, REACT_APP_AUTHDOMAIN, REACT_APP_PROJECTID, REACT_APP_STORAGEBUCKET, REACT_APP_MESAGGEID, REACT_APP_APPID, REACT_APP_MESID } = process.env;

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
export const db = getFirestore(app);
export const storage = getStorage(app);
