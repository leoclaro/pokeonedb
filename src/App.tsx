import { useEffect, useState } from 'react'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { Routes, Route } from 'react-router-dom'
import logo from './assets/logo.fw.png'
import PokemonSales from './PokemonSales'
import AdminSales from './AdminSales'
import GuidesPage from './components/GuidesPage'
import GuideDetail from './components/GuideDetail'
import LivePage from './components/LivePage'
import HomePage from './components/HomePage'
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
        <Route path="/lives" element={<LivePage />} />
        <Route path="/admin" element={<AdminSales />} />
      </Routes>
    </main>
  )
}

export default App
