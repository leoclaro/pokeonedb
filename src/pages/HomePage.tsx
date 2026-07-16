import { Link, NavLink } from 'react-router-dom'
import type { HistoryRecord } from '../types'
import { menuItems } from '../components/NavBar'
import './HomePage.css'
import { guides } from '../data/guides'
import { strategies } from '../data/estrategias'

interface HomePageProps {
  latestHistory: HistoryRecord[]
}

function HomePage({ latestHistory }: HomePageProps) {
  // 1. Padroniza e combina as duas listas adicionando o tipo de cada item
  const combinedItems = [
    ...guides.map(g => ({ ...g, type: 'guide' })),
    ...strategies.map(s => ({ ...s, type: 'strategy' }))
  ];

  // 2. Embaralha a lista e seleciona apenas 10 itens aleatórios
  const randomItems = [...combinedItems]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

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
            <h2>POKÉONE OFICIAL</h2>
            <p><a href="https://pokeonecommunity.com/" target="_blank" rel="noreferrer">
            Site Oficial</a></p>
            <p><a
              href="https://pokeonecommunity.com/multimedia/download/"              
              target="_blank"
              rel="noreferrer"
            >Download do Jogo</a></p>
            <p><a href="https://discord.com/invite/bNYRTFn" target="_blank" rel="noreferrer">
              Discord Oficial
            </a></p>
          </div>
          <div className="home-panel-card">
            <h2>CONFIRA</h2>
            <p><a href="#/guides">Nossos Guias</a></p>
            <p><a href="https://www.youtube.com/@5uperGamming" target="_blank" rel="noreferrer">Nossas Transmissões</a></p>
          </div>
        </aside>
      </section>

      <section className="home-content-grid">
        <div className="home-main-column">
          <h3 className="home-section-title">HISTÓRICO DE VENDAS (ÚLTIMOS 4)</h3>
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

        <aside className="home-side-column" style={{ display: 'block' }}>

          <div className="home-side-block"  style={{ marginBottom: '16px' }}>
            <h3 className="home-section-title">QUEM SOU</h3>
            <p>Sou somente mais um grande fan desse projeto, entrem em contato para negociações das minhas vendas.<br /><br />Nick: <b>LeleoBR</b><br />Discord: <a href="discord://discord.com/users/leleonorris" target="_blank" rel="noopener noreferrer">leleonorris</a></p>
          </div>

          <div className="home-side-block"  style={{ marginBottom: '16px' }}>
            <h3 className="home-section-title">RANDOM GUIDES & STRATEGIES</h3>
            <ul>
              {/* Renderiza a lista embaralhada com no máximo 10 itens */}
              {randomItems.map((item) => {
                const routePath = item.type === 'guide' 
                  ? `/guides/${item.slug}` 
                  : `/strategies/${item.slug}`;

                return (
                  <li key={`${item.type}-${item.slug}`}>
                    <Link to={routePath} className="guide-card-link">
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="home-side-block">
            <h3 className="home-section-title">SOCIAL</h3>
            <ul>
              {[{ name: 'YouTube', url: 'https://www.youtube.com/@5uperGamming' }].map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </li>
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