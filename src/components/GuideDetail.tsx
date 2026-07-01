import { Link, useParams } from 'react-router-dom'
import { getGuideBySlug } from '../data/guides'

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>()
  const guide = slug ? getGuideBySlug(slug) : null

  if (!guide) {
    return (
      <section className="guide-detail-page">
        <div className="page-header">
          <p className="eyebrow">GUIA NÃO ENCONTRADO</p>
          <h2>Desculpe, esse guia não existe.</h2>
          <p className="page-description">Verifique o link ou volte para a página de guias.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="guide-detail-page">
      <div className="detail-header">
        <div>
          <p className="eyebrow">{guide.title}</p>
          <h2>{guide.subtitle}</h2>
          <p className="page-description">{guide.description}</p>
        </div>
        <Link to="/guides" className="secondary-btn">
          Voltar para Guias
        </Link>
      </div>

      <div className="detail-content">
        <div className="detail-preview">
          <img src={guide.image} alt={guide.title} />
          <p>{guide.summary}</p>
        </div>

        <div className="detail-topics">
          <h3>O que você encontrará aqui</h3>
          <ul>
            {guide.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
