import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { NavLink, Routes, Route } from 'react-router-dom'
import logo from './assets/logo.fw.png'
import PokemonSales from './PokemonSales'
import AdminSales from './AdminSales'
import GuidesPage from './components/GuidesPage'
import GuideDetail from './components/GuideDetail'
import LivePage from './components/LivePage'
import { db } from './firebase'
import './App.css'

const menuItems = [
  { label: 'Principal', path: '/' },
  { label: 'Guias', path: '/guides' },
  { label: 'Vendas de Pokemons', path: '/sales' },
  { label: 'Lives', path: '/lives' },
]

interface HistoryRecord {
  id?: string
  title: string
  description: string
  date: string
}

const socialLinks = ['YouTube', 'Twitch', 'Discord']

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
        <nav className="menu" aria-label="Principal">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <section className="hero-section">
                <div className="hero-copy">
                  <p className="eyebrow">POKÉONE ADVENTURE</p>
                  <h1>Quer ser o melhor de todos? Então temos uma aventura para você!</h1>
                  <p className="hero-text">
                    PokeOne é um MMO feito por fãs para fãs. Ele conta com as regiões Kanto, Johto, Unova e Destiny Island (uma espécie de mini Kalos), além das Ilhas Sevii e outros mapas customizados exclusivos. É o único MMO que permite batalhas em grupo de até 3 amigos contra inimigos — o que, na minha opinião, o torna o melhor MMO de Pokémon lançado até hoje. O jogo também conta com algumas Mega Evoluções, ataques Z e mais de 800 Pokémon capturáveis.
                  </p>
                  <div className="hero-actions">
                    <a href="https://pokeonecommunity.com/multimedia/download/" className="primary-btn" target="_blank" rel="noreferrer">
                      POKÉONE DOWNLOAD
                    </a>
                    <NavLink to="/guides" className="secondary-btn">
                      CONFIRA MEUS GUIAS
                    </NavLink>
                  </div>
                </div>

                <aside className="hero-panel">
                  <div className="panel-card">
                    <h2>POKÉONE</h2>
                    <p>DOWNLOAD</p>
                    <p>Forum</p>
                  </div>
                  <div className="panel-card alt">
                    <h2>CHECK OUT</h2>
                    <p>OUR GUIDES</p>
                    <p>PokeOne Download</p>
                  </div>
                  <div className="panel-card">
                    <h2>JOIN OUR</h2>
                    <p>DISCORD</p>
                  </div>
                </aside>
              </section>

              <section className="content-grid">
                <div className="main-column">
                  <h3 className="section-title">ÚLTIMOS POKEMONS/ITENS ADICIONADOS PARA VENDAS</h3>
                  <div className="news-list">
                    {latestHistory.length > 0 ? (
                      latestHistory.map((item) => (
                        <article key={item.id} className="news-card">
                          <h4>{item.title}</h4>
                          <p>{item.description}</p>
                          <span>{item.date}</span>
                        </article>
                      ))
                    ) : (
                      <article className="news-card">
                        <h4>Sem histórico de vendas ainda</h4>
                        <p>Adicione um Pokémon para venda ou marque um Pokémon como vendido para gerar registros.</p>
                        <span>—</span>
                      </article>
                    )}
                  </div>
                </div>

                <aside className="side-column">
                  <div className="side-block">
                    <h3 className="section-title">YOUTUBE STREAM</h3>
                    <p>Minhas transmissões de aventura, guias, e eventos.</p>
                  </div>

                  <div className="side-block">
                    <h3 className="section-title">RANDOM GUIDES</h3>
                    <ul>
                      <li>Sevii Island Dailies</li>
                      <li>Kanto Dailies</li>
                      <li>General Strategy</li>
                      <li>Sevii Island Bosses</li>
                    </ul>
                  </div>

                  <div className="side-block">
                    <h3 className="section-title">SOCIAL</h3>
                    <ul>
                      {socialLinks.map((link) => (
                        <li key={link}>{link}</li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </section>

              <footer className="footer">
                <p>{menuItems.map((item) => (<span key={item.label}> • {item.label}</span>))} •</p>
                <p>© PokeOne Database - pokeonedb.web.app</p>
              </footer>
            </>
          }
        />
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
