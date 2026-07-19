import { type ExpandedGuide, type GuideStep } from './expanded-guide'
import { termosFuncoesGuide } from './termos-funcoes-guia'
import { sistemaPontuacaoGuide } from './sistema-pontuacao'
import { itemSalesGuide } from './item-sales'
import { fabricarPokebolasEspeciaisGuide } from './fabricar-pokebolas-especiais'
import { barreirasProtecoesGuide } from './barreiras-protecoes'
import { habilidadesMaiorDanoDiretoGuide } from './habilidades-maior-dano-direto'
import { condicoesClimaticasETerrenosGuide } from './condicoes-climaticas'
import { obterPlatesReliquiasGuide } from './obter-plates-e-reliquias'
import { triangulosTiposGuide } from './triangulos-tipos'
import { habilidadesComEfeitosSecretosForaBatalhaGuide } from './habilidades-com-efeitos-secretos-fora-batalha'

export type { ExpandedGuide, GuideStep }

export const guides: ExpandedGuide[] = [
  termosFuncoesGuide,
  sistemaPontuacaoGuide,
  itemSalesGuide,
  fabricarPokebolasEspeciaisGuide,
  barreirasProtecoesGuide,
  habilidadesMaiorDanoDiretoGuide,
  condicoesClimaticasETerrenosGuide,
  obterPlatesReliquiasGuide,
  triangulosTiposGuide,
  habilidadesComEfeitosSecretosForaBatalhaGuide,
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
