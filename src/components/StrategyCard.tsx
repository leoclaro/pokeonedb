import { Link } from 'react-router-dom'
import type { Strategy } from '../data/strategies'

interface StrategyCardProps {
  strategy: Strategy
}

export default function StrategyCard({ strategy }: StrategyCardProps) {
  return (
    <article className="strategy-card">
      {strategy.image && strategy.image.length > 0 && (<img src={strategy.image} alt={strategy.title} />)}
      <div className="strategy-card-copy">
        <Link to={`/strategies/${strategy.slug}`} className="strategy-card-link">
          <h3>{strategy.title}</h3>
        </Link>
        <p>{strategy.subtitle}</p>
      </div>
    </article>
  )
}
