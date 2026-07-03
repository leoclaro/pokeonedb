import { type ExpandedGuide, type GuideStep } from './expanded-guide'
import { termosFuncoesGuide } from './termos-funcoes-guia'
import { kantoDailiesGuide } from './kanto-dailies'
import { generalStrategyGuide } from './general-strategy'
import { seviiBossesGuide } from './sevii-bosses'
import { itemSalesGuide } from './item-sales'

export type { ExpandedGuide, GuideStep }

export const guides: ExpandedGuide[] = [
  termosFuncoesGuide,
  kantoDailiesGuide,
  generalStrategyGuide,
  seviiBossesGuide,
  itemSalesGuide,
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
