import { useEffect, useState } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import logo from './assets/logo.fw.png'
import PokemonSales from './PokemonSales'
import AdminSales from './AdminSales'
import { db } from './firebase'
import './App.css'

const menuItems = ['Principal', 'Guias', 'Vendas de Pokemons', 'Lives']

interface HistoryRecord {
  id?: string
  title: string
  description: string
  date: string
}

const guides = ['Sevii Island Dailies', 'Kanto Dailies', 'General', 'Sevii Island Bosses']
const socialLinks = ['YouTube', 'Twitch', 'Discord']

function App() {
  const [selectedPage, setSelectedPage] = useState('Principal')
  const [currentHash, setCurrentHash] = useState(window.location.hash)
  const [latestHistory, setLatestHistory] = useState<HistoryRecord[]>([])
  const isSalesPage = selectedPage === 'Vendas de Pokemons'
  const isAdminPage = currentHash === '#admin'

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

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
            <a
              key={item}
              href="#"
              className={`menu-link ${selectedPage === item ? 'active' : ''}`}
              onClick={(event) => {
                event.preventDefault()
                setSelectedPage(item)
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {isAdminPage ? (
        <AdminSales />
      ) : isSalesPage ? (
        <PokemonSales />
      ) : (
        <>
          <section className="hero-section">
            <div className="hero-copy">
              <p className="eyebrow">POKÉONE ADVENTURE</p>
              <h1>Quer ser o melhor de todos? Então temos uma aventura para você!</h1>
              <p className="hero-text">
                PokeOne é um MMO feito por fãs para fãs. Ele conta com as regiões Kanto, Johto, Unova e Destiny Island (uma espécie de mini Kalos), além das Ilhas Sevii e outros mapas customizados exclusivos. É o único MMO que permite batalhas em grupo de até 3 amigos contra inimigos — o que, na minha opinião, o torna o melhor MMO de Pokémon lançado até hoje. O jogo também conta com algumas Mega Evoluções, ataques Z e mais de 800 Pokémon capturáveis.
              </p>
              <div className="hero-actions">
                <a href="https://pokeonecommunity.com/multimedia/download/" className="primary-btn" target="_blank">POKÉONE DOWNLOAD</a>
                <a href="#guides" className="secondary-btn">CONFIRA MEUS GUIAS</a>
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

          <section className="content-grid" id="guides">
            <div className="main-column">
              <h3 className="section-title">ULTIMOS POKEMONS/ITENS ADICIONADOS PARA VENDAS</h3>
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
                  {guides.map((guide) => (
                    <li key={guide}>{guide}</li>
                  ))}
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
            <p>{menuItems.map((item) => (<span key={item}> • {item}</span>))} •</p>
            <p>© PokeOne Database - pokeonedb.web.app</p>
          </footer>
        </>
      )}
    </main>
  )
}

export default App
