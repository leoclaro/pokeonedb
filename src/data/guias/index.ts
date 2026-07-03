import { seviiIslandDailiesGuide, type ExpandedGuide, type GuideStep } from './sevii-island-dailies'
import { kantoDailiesGuide } from './kanto-dailies'
import { generalStrategyGuide } from './general-strategy'
import { seviiBossesGuide } from './sevii-bosses'
import { itemSalesGuide } from './item-sales'

export type { ExpandedGuide, GuideStep }

export const guides: ExpandedGuide[] = [
  seviiIslandDailiesGuide,
  kantoDailiesGuide,
  generalStrategyGuide,
  seviiBossesGuide,
  itemSalesGuide,
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
