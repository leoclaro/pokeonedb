import type { ExpandedGuide } from './expanded-guide'
import imgKantoLavender from '/src/assets/guides/item-sales/kanto-lavender.png'
import imgJohtoGoldenrod from '/src/assets/guides/item-sales/johto-goldenrod.png'
import imgUnovaRouteU5Outside from '/src/assets/guides/item-sales/unova-route-u5-outside.png'
import imgUnovaRouteU5Inside from '/src/assets/guides/item-sales/unova-route-u5-inside.png'
import imgUnovaUndellaPokemonCenterBillionaireManiac from '/src/assets/guides/item-sales/unova-undella-pokemon-center-billionaire-maniac.png'
import imgUnovaIcirrusPokemonCenterOreManiac from '/src/assets/guides/item-sales/unova-icirrus-pokemon-center-ore-maniac.png'

export const obterPlatesReliquiasGuide: ExpandedGuide = {
  slug: 'plates-e-reliquias',
  title: 'Plates e relíquais',
  subtitle: 'Guia completo ensinando a obter plates e relíquias, e onde vendê-las para NPCs.',
  description:
    'Essa guia irá te ensinar a farmar suas próprias relíquias e plates, e onde vendê-las para NPCs espalhados pelo mundo de Pokémon.',
  summary:
    'Irei listar os locais de venda, e quais itens conseguirá vender nesses locais.',
  imageIsOnlyCard: true,
  image:
    imgUnovaRouteU5Outside,
  topics: [],
  steps: [
    {
      stepTitle: 'O que são?',
      steps:[
        {
          title: 'Relíquias',
          // description: 'Relíquias são itens raros que podem ser encontrados mergulhando em "Abyssal Ruins". Elas podem ser vendidas para NPCs por uma boa quantia de PokeDollars. Cada relíquia tem um valor diferente, segue a lista delas:\n\n- Relic Copper\n- Relic Silver\n- Relic Gold\n- Relic Vase\n- Relic Band\n- Relic Statue\n- Relic Crown',
          description: "Relíquias são itens raros que podem ser encontrados mergulhando em \"Abyssal Ruins\". Elas podem ser vendidas para NPCs por uma boa quantia de PokeDollars. Cada relíquia tem um valor diferente, segue a lista delas:\n\n- ![Relic Copper](https://img.pokemondb.net/sprites/items/relic-copper.png) Relic Copper\n- ![Relic Silver](https://img.pokemondb.net/sprites/items/relic-silver.png) Relic Silver\n- ![Relic Gold](https://img.pokemondb.net/sprites/items/relic-gold.png) Relic Gold\n- ![Relic Vase](https://img.pokemondb.net/sprites/items/relic-vase.png) Relic Vase\n- ![Relic Band](https://img.pokemondb.net/sprites/items/relic-band.png) Relic Band\n- ![Relic Statue](https://img.pokemondb.net/sprites/items/relic-statue.png) Relic Statue\n- ![Relic Crown](https://img.pokemondb.net/sprites/items/relic-crown.png) Relic Crown\n\nApós coletar essas relíquias, você pode levá-las ao Maníaco por Ruínas na Rota 21 para vendê-las pelo dobro do preço!"
        },
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
          description: '- Balm Mushroom',
          imageWidthNatural: true,
          image:[        
                imgUnovaRouteU5Outside,
                imgUnovaRouteU5Inside
            ]
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
