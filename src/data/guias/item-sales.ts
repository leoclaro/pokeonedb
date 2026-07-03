import type { ExpandedGuide } from './expanded-guide'
import imgUnovaRouteU5Outside from '/src/assets/guides/item-sales/unova-route-u5-outside.png'
import imgUnovaRouteU5Inside from '/src/assets/guides/item-sales/unova-route-u5-inside.png'

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
          title: 'ICIRRUS PC',
          description: 'Comet Shard\nPearl String',
          image: '',
        },
        {
          title: 'UNDELLA PC - Billionaire Maniac',
          description: 'Relics',
          image: '',
        },
        {
          title: 'Unova Route U5 - Entre dentro da Van para conseguir vender',
          description: 'Balm Mushroom',
          imageWidthNatural: true,
          image:[        
                imgUnovaRouteU5Outside,
                imgUnovaRouteU5Inside
            ]
        },
        {
          title: 'Lavander / Goldenrod - Barraquinha rocha',
          description: 'Stardust\nStar Piece\nNugget\nBig Nugget\nPearl\nBig Pearl\nRare Bone',
          image: '',
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
