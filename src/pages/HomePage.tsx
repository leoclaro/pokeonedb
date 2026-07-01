import { NavLink } from 'react-router-dom'
import type { HistoryRecord } from '../types'
import { menuItems } from './NavBar'
import './HomePage.css'

interface HomePageProps {
  latestHistory: HistoryRecord[]
}

function HomePage({ latestHistory }: HomePageProps) {
  return (
    <>
      <section className="home-hero-section">
        <div className="home-hero-copy">
          <p className="home-eyebrow">POKÉONE ADVENTURE</p>
          <h1>Quer ser o melhor de todos? Então temos uma aventura para você!</h1>
          <p className="home-hero-text">
            PokeOne é um MMO feito por fãs para fãs. Ele conta com as regiões Kanto, Johto, Unova e Destiny Island (uma espécie de mini Kalos), além das Ilhas Sevii e outros mapas customizados exclusivos. É o único MMO que permite batalhas em grupo de até 3 amigos contra inimigos — o que, na minha opinião, o torna o melhor MMO de Pokémon lançado até hoje. O jogo também conta com algumas Mega Evoluções, ataques Z e mais de 800 Pokémon capturáveis.
          </p>
          <div className="home-hero-actions">
            <a
              href="https://pokeonecommunity.com/multimedia/download/"
              className="home-primary-btn"
              target="_blank"
              rel="noreferrer"
            >
              POKÉONE DOWNLOAD
            </a>
            <NavLink to="/guides" className="home-secondary-btn">
              CONFIRA MEUS GUIAS
            </NavLink>
          </div>
        </div>

        <aside className="home-hero-panel">
          <div className="home-panel-card">
            <h2>POKÉONE</h2>
            <p>DOWNLOAD</p>
            <p>Forum</p>
          </div>
          <div className="home-panel-card home-panel-card-alt">
            <h2>CHECK OUT</h2>
            <p>OUR GUIDES</p>
            <p>PokeOne Download</p>
          </div>
          <div className="home-panel-card">
            <h2>JOIN OUR</h2>
            <p>DISCORD</p>
          </div>
        </aside>
      </section>

      <section className="home-content-grid">
        <div className="home-main-column">
          <h3 className="home-section-title">ÚLTIMOS POKEMONS/ITENS ADICIONADOS PARA VENDAS</h3>
          <div className="home-news-list">
            {latestHistory.length > 0 ? (
              latestHistory.map((item) => (
                <article key={item.id} className="home-news-card">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                  <span>{item.date}</span>
                </article>
              ))
            ) : (
              <article className="home-news-card">
                <h4>Sem histórico de vendas ainda</h4>
                <p>Adicione um Pokémon para venda ou marque um Pokémon como vendido para gerar registros.</p>
                <span>—</span>
              </article>
            )}
          </div>
        </div>

        <aside className="home-side-column">
          <div className="home-side-block">
            <h3 className="home-section-title">YOUTUBE STREAM</h3>
            <p>Minhas transmissões de aventura, guias, e eventos.</p>
          </div>

          <div className="home-side-block">
            <h3 className="home-section-title">RANDOM GUIDES</h3>
            <ul>
              <li>Sevii Island Dailies</li>
              <li>Kanto Dailies</li>
              <li>General Strategy</li>
              <li>Sevii Island Bosses</li>
            </ul>
          </div>

          <div className="home-side-block">
            <h3 className="home-section-title">SOCIAL</h3>
            <ul>
              {['YouTube', 'Twitch', 'Discord'].map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <footer className="home-footer">
        <p>
          {menuItems.map((item) => (
            <span key={item.label}> • {item.label}</span>
          ))}{' '}
          •
        </p>
        <p>© PokeOne Database - pokeonedb.web.app</p>
      </footer>
    </>
  )
}

export default HomePage
