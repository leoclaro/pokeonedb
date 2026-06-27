import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDLqvEIbxyFJd_oOZE2qDMg8fAf24UVpX0',
  authDomain: 'pokeonedb.firebaseapp.com',
  projectId: 'pokeonedb',
  storageBucket: 'pokeonedb.firebasestorage.app',
  messagingSenderId: '562151228040',
  appId: '1:562151228040:web:438cbb60e260c74aeb553d',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db }
export default app
