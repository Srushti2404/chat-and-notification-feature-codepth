import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAshTo2-rIHM9Py9vXmBZbFPqaWzU2ALVM',
  authDomain: 'giggle-99.firebaseapp.com',
  projectId: 'giggle-99',
  storageBucket: 'giggle-99.appspot.com',
  messagingSenderId: '481354699932',
  appId: '1:481354699932:web:294a84de54df527d3e8959',
}

// Initialize Firebase
const apps = getApps() // Use getApps to check if Firebase has already been initialized
const app = apps.length === 0 ? initializeApp(firebaseConfig) : apps[0]
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export { db, auth, storage, provider }
