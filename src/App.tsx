import logo from './assets/logo.fw.png'
import './App.css'

const menuItems = ['Principal', 'Guias', 'Vendas', 'Lives']

const latestNews = [
  {
    title: 'MAY 26′ SHINY HUNTER OF THE MONTH',
    description:
      'May 2026 Results Shiny Hunter Hall of Fame Incredible work, Trainers! The skill—and the shiny luck—you’ve shown in your recent hunts is absolutely next-level.',
    date: '2026-06-16 21:21:28',
  },
  {
    title: 'POKÉONE PREMIER LEAGUE',
    description:
      'Season 1 Launch 🏆 PokéOne Premier League The Inaugural Season Begins. Eight franchises will enter the league, build their rosters and compete for glory.',
    date: '2026-06-03 22:47:19',
  },
  {
    title: 'APRIL 26′ SHINY HUNTER OF THE MONTH',
    description:
      'April 2026 Results Shiny Hunter Hall of Fame Absolutely Legendary, Trainers! This month has been one for the history books.',
    date: '2026-05-18 16:24:48',
  },
]

const guides = ['Sevii Island Dailies', 'Kanto Dailies', 'General', 'Sevii Island Bosses']
const socialLinks = ['YouTube', 'Twitch', 'Discord']

function App() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <img src={logo} alt="PokeOne Database" />
        </div>
        <nav className="menu" aria-label="Principal">
          {menuItems.map((item) => (
            <a key={item} href="#" className="menu-link">
              {item}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">POKÉONE ADVENTURE</p>
          <h1>Quer ser o melhor de todos? Então temos uma aventura para você!</h1>
          <p className="hero-text">
            PokeOne é um MMO feito por fãs para fãs. Ele conta com as regiões Kanto, Johto, Unova e Destiny Island (uma espécie de mini Kalos), além das Ilhas Sevii e outros mapas customizados exclusivos. É o único MMO que permite batalhas em grupo de até 3 amigos contra inimigos — o que, na minha opinião, o torna o melhor MMO de Pokémon lançado até hoje. O jogo também conta com algumas Mega Evoluções, ataques Z e mais de 800 Pokémon capturáveis.
          </p>
          <div className="hero-actions">
            <a href="https://pokeonecommunity.com/multimedia/download/" className="primary-btn" target="_blank" >POKÉONE DOWNLOAD</a>
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
          <h3 className="section-title">LATEST NEWS</h3>
          <div className="news-list">
            {latestNews.map((item) => (
              <article key={item.title} className="news-card">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <span>{item.date}</span>
              </article>
            ))}
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
        <p>© PokeOne Database</p>
      </footer>
    </main>
  )
}

export default App
