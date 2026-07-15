import { type ExpandedStrategy, type StrategyStep } from './expanded-strategy'
import { beatUpStrategy } from './beat-up-strategy.ts'

export type { ExpandedStrategy, StrategyStep }

export const strategies: ExpandedStrategy[] = [
  beatUpStrategy
]

export function getStrategyBySlug(slug: string) {
  return strategies.find((strategy) => strategy.slug === slug)
}
