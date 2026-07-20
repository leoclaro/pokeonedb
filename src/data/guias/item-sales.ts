import type { ExpandedGuide } from './expanded-guide'
import imgKantoLavender from '/src/assets/guides/item-sales/kanto-lavender.png'
import imgJohtoGoldenrod from '/src/assets/guides/item-sales/johto-goldenrod.png'
import imgUnovaRouteU5Outside from '/src/assets/guides/item-sales/unova-route-u5-outside.png'
import imgUnovaRouteU5Inside from '/src/assets/guides/item-sales/unova-route-u5-inside.png'
import imgUnovaUndellaPokemonCenterBillionaireManiac from '/src/assets/guides/item-sales/unova-undella-pokemon-center-billionaire-maniac.png'
import imgUnovaIcirrusPokemonCenterOreManiac from '/src/assets/guides/item-sales/unova-icirrus-pokemon-center-ore-maniac.png'
import imgUnovaMiltraltonPokeCenter from '/src/assets/guides/item-sales/unova-miltralton-pokecenter.png'

export const itemSalesGuide: ExpandedGuide = {
  slug: 'item-sales',
  title: 'Vendas de itens em NPCs',
  subtitle: 'Guia completo de locais para vender itens dropados',
  description:
    'Essa guia irá te ensinar onde vender determinados itens adquiridos em sua jornada, sendo boa parte deles dropados de boss feitos diariamente.',
  summary:
    'Irei listar os locais de venda, e quais itens conseguirá vender nesses locais.',
  imageIsOnlyCard: true,
  image:
    imgUnovaRouteU5Outside,
  topics: [],
  steps: [
    {
      stepTitle: 'Locais de venda de itens',
      steps:[
        {
          title: 'Unova - Icirrus City - NPC dentro do PokeCenter',
          description: '- Comet Shard\n- Pearl String',
          imageWidthNatural: true,
          image: imgUnovaIcirrusPokemonCenterOreManiac,
        },
        {
          title: 'Unova - Undella Town - PokeCenter - NPC Billionaire Maniac',
          description: '- Relics',
          imageWidthNatural: true,
          image: imgUnovaUndellaPokemonCenterBillionaireManiac,
        },
        {
          title: 'Unova Route U5 - Entre dentro da Van para conseguir vender',
          description: '- Berries\n- Balm Mushroom\n- Outros Mushrooms',
          imageWidthNatural: true,
          image:[        
                imgUnovaRouteU5Outside,
                imgUnovaRouteU5Inside
            ]
        },
        {
          title: 'Unova - Mistralton City - NPC Mulch Maniac dentro do PokeCenter',
          description: '- Damp Mulch\n- Growth Mulch\n- Stable Mulch\n- Talvez existam outros Mulchs',
          imageWidthNatural: true,
          image: imgUnovaMiltraltonPokeCenter
        },
        {
          title: 'Kanto - Lavender Town / Johto - Goldenrod City | Barraquinha rocha',
          description: '- Stardust\n- Star Piece\n- Nugget\n- Big Nugget\n- Pearl\n- Big Pearl\n- Rare Bone',
          imageWidthNatural: true,
          image: [imgJohtoGoldenrod, imgKantoLavender]
        },
      ]
    },    
  ],
  tips: [
    'Colete itens de boss diários para maximizar seu farm de moedas',
    'A Van em Unova Route U5 é um dos melhores pontos de venda para Balm Mushrooms',
    'Organize seus itens por local de venda para otimizar o tempo',
    'Balm Mushrooms são especialmente valiosos - priorize coletá-los',
    'Verifique os preços de cada item antes de vender em massa',
  ],
  images: [
    imgUnovaRouteU5Outside,
    imgUnovaRouteU5Inside,
  ],
}
