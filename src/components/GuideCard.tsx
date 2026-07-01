import { Link } from 'react-router-dom'
import type { Guide } from '../data/guides'

interface GuideCardProps {
  guide: Guide
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="guide-card">
      <img src={guide.image} alt={guide.title} />
      <div className="guide-card-copy">
        <Link to={`/guides/${guide.slug}`} className="guide-card-link">
          <h3>{guide.title}</h3>
        </Link>
        <p>{guide.subtitle}</p>
      </div>
    </article>
  )
}
