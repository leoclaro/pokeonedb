import { type ExpandedGuide, type GuideStep } from './expanded-guide'
import { termosFuncoesGuide } from './termos-funcoes-guia'
import { sistemaPontuacaoGuide } from './sistema-pontuacao'
import { itemSalesGuide } from './item-sales'
import { fabricarPokebolasEspeciaisGuide } from './fabricar-pokebolas-especiais'
import { barreirasProtecoesGuide } from './barreiras-protecoes'

export type { ExpandedGuide, GuideStep }

export const guides: ExpandedGuide[] = [
  termosFuncoesGuide,
  sistemaPontuacaoGuide,
  itemSalesGuide,
  fabricarPokebolasEspeciaisGuide,
  barreirasProtecoesGuide
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
