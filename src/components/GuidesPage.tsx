import GuideCard from './GuideCard'
import { guides } from '../data/guides'

export default function GuidesPage() {
  return (
    <section className="guides-page">
      <div className="page-header">
        <p className="eyebrow">GUIAS</p>
        <h2>Explore nossos guias organizados por temas</h2>
        <p className="page-description">
          Aqui estão os guias principais para te ajudar a dominar PokeOne. Clique em qualquer título para abrir o guia completo.
        </p>
      </div>

      <div className="guide-gallery">
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </section>
  )
}
