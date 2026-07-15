import StrategyCard from '../components/StrategyCard'
import { strategies } from '../data/strategies'

export default function StrategiesPage() {
  return (
    <section className="strategies-page">
      <div className="page-header">
        <p className="eyebrow">ESTRATÉGIAS</p>
        <h2>Explore nossas estratégias organizadas</h2>
        <p className="page-description">
          Aqui estão as estratégias principais para te ajudar a dominar PokeOne. Clique em qualquer título para abrir a estratégia completa.
        </p>
      </div>

      <div className="strategy-gallery">
        {strategies.map((strategy) => (
          <StrategyCard key={strategy.slug} strategy={strategy} />
        ))}
      </div>
    </section>
  )
}
