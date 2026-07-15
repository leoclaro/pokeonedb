import { Link, useParams } from 'react-router-dom'
import { getGuideBySlug } from '../data/guides'
import React from 'react'

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
        {guide.image && guide.image.length > 0 && guide.imageIsOnlyCard != true && (<div className="detail-preview">
          <img src={guide.image} alt={guide.title} />
          <p>{guide.summary}</p>
        </div>)}

        {guide.topics && guide.topics.length > 0 && (<div className="detail-topics">
          <h3>O que você encontrará aqui</h3>
          <ul>
            {guide.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>)}

        {guide.steps && guide.steps.length > 0 && (<div className="detail-steps">
          {guide.steps.map((step, index) => (
            <React.Fragment key={index}>
              <h3>{step.stepTitle}</h3>
              {step.steps.map((stepGuide, indexGuide) => (
                <div key={indexGuide} className="step-item">
                  {stepGuide.title != null && <h4>{stepGuide.title}</h4>}
                  <p>{stepGuide.description}</p>
                  {stepGuide.image && (
                    Array.isArray(stepGuide.image) ? (
                      stepGuide.image.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={stepGuide.title}
                          style={stepGuide.imageWidthNatural ? { width: 'auto', maxWidth: 'none' } : undefined}
                        />
                      ))
                    ) : (
                      <img
                        src={stepGuide.image}
                        alt={stepGuide.title}
                        style={stepGuide.imageWidthNatural ? { width: 'auto', maxWidth: 'none' } : undefined}
                      />
                    )
                  )}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>)}
      </div>
    </section>
  )
}
