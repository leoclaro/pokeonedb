import { type ExpandedGuide, type GuideStep } from './expanded-guide'
import { termosFuncoesGuide } from './termos-funcoes-guia'
import { sistemaPontuacaoGuide } from './sistema-pontuacao'
import { itemSalesGuide } from './item-sales'

export type { ExpandedGuide, GuideStep }

export const guides: ExpandedGuide[] = [
  termosFuncoesGuide,
  sistemaPontuacaoGuide,
  itemSalesGuide,
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
