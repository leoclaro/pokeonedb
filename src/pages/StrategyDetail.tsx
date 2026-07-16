import { Link, useParams } from 'react-router-dom'
import { getStrategyBySlug } from '../data/strategies'
import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function StrategyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const strategy = slug ? getStrategyBySlug(slug) : null

  if (!strategy) {
    return (
      <section className="strategy-detail-page">
        <div className="page-header">
          <p className="eyebrow">ESTRATÉGIA NÃO ENCONTRADO</p>
          <h2>Desculpe, essa estratégia não existe.</h2>
          <p className="page-description">Verifique o link ou volte para a página de estratégias.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="strategy-detail-page">
      <div className="detail-header">
        <div>
          <p className="eyebrow">{strategy.title}</p>
          <h2>{strategy.subtitle}</h2>
          <p className="page-description">{strategy.description}</p>
        </div>
        <Link to="/strategies" className="secondary-btn">
          Voltar para Estratégias
        </Link>
      </div>

      <div className="detail-content">
        {strategy.image && strategy.image.length > 0 && strategy.imageIsOnlyCard != true && (<div className="detail-preview">
          <img src={strategy.image} alt={strategy.title} />
          <p>{strategy.summary}</p>
        </div>)}

        {strategy.topics && strategy.topics.length > 0 && (<div className="detail-topics">
          <h3>O que você encontrará aqui</h3>
          <ul>
            {strategy.topics.map((topic) => (
              <li key={topic}>{topic}</li>
            ))}
          </ul>
        </div>)}

        {strategy.steps && strategy.steps.length > 0 && (<div className="detail-steps">
          {strategy.steps.map((step, index) => (
            <React.Fragment key={index}>
              <h3>{step.stepTitle}</h3>
              {step.steps.map((stepStrategy, indexStrategy) => (
                <div key={indexStrategy} className="step-item">
                  {stepStrategy.title != null && <h4>{stepStrategy.title}</h4>}
                  
                  <p>
                    <ReactMarkdown
                      children={stepStrategy.description}
                      components={{
                        img: ({ node, ...props }) => (
                          <img
                            {...props}
                            
                            width="24"
                            height="24"
                            style={{ 
                              width: '24px',
                              height: '24px',
                              verticalAlign: 'middle', 
                              display: 'inline-block', 
                              margin: '0 4px' 
                            }}
                            loading="lazy"
                          />
                        )
                      }}
                    />
                  </p>

                  {stepStrategy.image && (
                    Array.isArray(stepStrategy.image) ? (
                      stepStrategy.image.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt={stepStrategy.title}
                          style={stepStrategy.imageWidthNatural ? { width: 'auto', maxWidth: 'none' } : undefined}
                        />
                      ))
                    ) : (
                      <img
                        src={stepStrategy.image}
                        alt={stepStrategy.title}
                        style={stepStrategy.imageWidthNatural ? { width: 'auto', maxWidth: 'none' } : undefined}
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
