import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { Routes, Route } from 'react-router-dom'
import logo from './assets/logo.fw.png'
import PokemonSales from './pages/PokemonSales'
import ItemSales from './pages/ItemSales'
import AdminSales from './pages/AdminSales'
import AdminItemSales from './pages/AdminItemSales'
import GuidesPage from './pages/GuidesPage'
import GuideDetail from './pages/GuideDetail'
import LivePage from './pages/LivePage'
import HomePage from './pages/HomePage'
import NavBar from './components/NavBar'
import { db } from './firebase'
import './App.css'

interface HistoryRecord {
  id?: string
  title: string
  description: string
  date: string
}

function App() {
  const [latestHistory, setLatestHistory] = useState<HistoryRecord[]>([])

  useEffect(() => {
    const historyQuery = query(
      collection(db, 'salesHistory'),
      orderBy('timestamp', 'desc'),
      limit(10)
    )

    const unsubscribe = onSnapshot(historyQuery, (snapshot) => {
      const items = snapshot.docs.map((doc) => {
        const data = doc.data() as any
        const timestamp = data.timestamp
        const date = timestamp?.toDate ? timestamp.toDate().toLocaleString('pt-BR') : ''

        return {
          id: doc.id,
          title: data.title ?? '',
          description: data.description ?? '',
          date,
        }
      })

      setLatestHistory(items)
    })

    return unsubscribe
  }, [])

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="PokeOne Database" />
        </div>
        <NavBar />
      </header>

      <Routes>
        <Route path="/" element={<HomePage latestHistory={latestHistory} />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/guides/:slug" element={<GuideDetail />} />
        <Route path="/sales" element={<PokemonSales />} />
        <Route path="/items" element={<ItemSales />} />
        <Route path="/lives" element={<LivePage />} />
        <Route path="/admin" element={<AdminSales />} />
        <Route path="/admin-items" element={<AdminItemSales />} />
      </Routes>
    </main>
  )
}

export default App
