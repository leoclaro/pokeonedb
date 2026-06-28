import { initializeApp } from 'firebase/app'
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'

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

async function main() {
  const q = query(collection(db, 'salesHistory'), orderBy('timestamp', 'desc'), limit(10))
  const snap = await getDocs(q)
  console.log(`Found ${snap.size} history docs:`)
  for (const d of snap.docs) {
    const data = d.data()
    console.log(d.id, JSON.stringify(data, null, 2))
  }
}

main().catch((e) => {
  console.error('Error fetching history:', e)
  process.exit(1)
})
