import type { ExpandedGuide } from './expanded-guide'
import imgMovesNecessarios from '/src/assets/guides/obter-plates/moves-necessarios.png'
import imgLocalInicioSurf from '/src/assets/guides/obter-plates/local-inicio-surf.png'
import imgLocalMergulho from '/src/assets/guides/obter-plates/local-mergulho.png'
import imgUnovaUndellaPokemonCenterBillionaireManiac from '/src/assets/guides/item-sales/unova-undella-pokemon-center-billionaire-maniac.png'
import imgPrimeiraPedra from '/src/assets/guides/obter-plates/primeira-pedra.png'
import imgFloor1 from '/src/assets/guides/obter-plates/abyssal-ruins/1f.png'
import imgFloor2 from '/src/assets/guides/obter-plates/abyssal-ruins/2f.png'
import imgFloor3 from '/src/assets/guides/obter-plates/abyssal-ruins/3f.png'
import imgFloor4 from '/src/assets/guides/obter-plates/abyssal-ruins/4f.png'

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
    imgLocalMergulho,
  topics: ['O que são?', 'Como farmar?', 'Onde vender?'],
  steps: [
    {
      stepTitle: 'O que são?',
      steps: [
        {
          title: 'Relíquias',
          description: "Relíquias são itens raros que podem ser encontrados mergulhando em \"Abyssal Ruins\". Elas podem ser vendidas para NPCs por uma boa quantia de PokeDollars. Cada relíquia tem um valor diferente, segue a lista delas:\n\n\u00a0\n\n- ![Relic Copper](https://img.pokemondb.net/sprites/items/relic-copper.png) Relic Copper\n- ![Relic Silver](https://img.pokemondb.net/sprites/items/relic-silver.png) Relic Silver\n- ![Relic Gold](https://img.pokemondb.net/sprites/items/relic-gold.png) Relic Gold\n- ![Relic Vase](https://img.pokemondb.net/sprites/items/relic-vase.png) Relic Vase\n- ![Relic Band](https://img.pokemondb.net/sprites/items/relic-band.png) Relic Band\n- ![Relic Statue](https://img.pokemondb.net/sprites/items/relic-statue.png) Relic Statue\n- ![Relic Crown](https://img.pokemondb.net/sprites/items/relic-crown.png) Relic Crown\n\n\u00a0\n\nApós coletar essas relíquias, você pode levá-las ao NPC **Billionaire Maniac** no PokeCenter de Undella Town para vendê-las!"
        },
        {
          title: 'Placas (Plates)',
          description: 'As placas (plates) são itens holds que podem ser equipados. Elas aumentam em 20% o poder dos movimentos do tipo correspondente quando seguradas por qualquer Pokémon. segue a lista delas:\n\n\u00a0\n\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/fist-plate.png)Fist Plate: fortalece golpes lutadores.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/sky-plate.png)Sky Plate: fortalece golpes voadores.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/toxic-plate.png)Toxic Plate: fortalece golpes venenosos.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/earth-plate.png)Earth Plate: fortalece golpes do tipo terra.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/stone-plate.png)Stone Plate: fortalece golpes do tipo pedra.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/insect-plate.png)Insect Plate: fortalece golpes do tipo inseto.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/spooky-plate.png)Spooky Plate: fortalece golpes do tipo fantasma.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/draco-plate.png)Draco Plate: fortalece golpes do tipo dragão.\n- ![Zap Plate](https://img.pokemondb.net/sprites/items/zap-plate.png)Zap Plate: fortalece golpes do tipo elétrico.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/dread-plate.png)Dread Plate: fortalece golpes do tipo sombrio.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/iron-plate.png)Iron Plate: fortalece golpes do tipo aço.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/flame-plate.png)Flame Plate: fortalece golpes do tipo fogo.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/splash-plate.png)Splash Plate: fortalece golpes do tipo água.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/meadow-plate.png)Meadow Plate: fortalece golpes do tipo grama.\n- ![Fist Plate](https://img.pokemondb.net/sprites/items/icicle-plate.png)Icicle Plate: fortalece golpes do tipo gelo.\n- ![Pixie Plate](https://img.pokemondb.net/sprites/items/pixie-plate.png)Pixie Plate: fortalece golpes do tipo fada.\n- ![Mind Plate](https://img.pokemondb.net/sprites/items/mind-plate.png)Mind Plate: fortalece golpes do tipo psíquico.',
        },
      ]
    },
    {
      stepTitle: 'Como farmar?',
      steps: [
        {
          description: 'As relíquias e placas podem ser farmadas ambas no mesmo lugar, o lugar se chama **Abyssal Ruins**. Essa ruína se encontra ao leste(direita) de **Undella Town** no oceano. Ela é acessível através da praia a direita, depois subindo, e em seguinda você irá surfar, até encontrar uma mancha preta no formato oval, nela você poderá mergulhar (dive).',
        },
        {
          title: 'Pré-Requisitos',
          description: 'Esses são os movimentos do pokemon que são **pre-requisitos** para farmar',
          imageWidthNatural: true,
          image: imgMovesNecessarios,
        },
        {
          title: 'Local de início do Surf',
          description: 'Local da praia a direita de Undella Town que você irá iniciar o Surf. Iniciando, você irá sempre para direita procurando uma mancha preta no formato oval.',
          imageWidthNatural: true,
          image: imgLocalInicioSurf,
        },
        {
          title: 'Local do mergulho',
          description: 'Mergulhe nesse local para encontrar as relíquias e plates, você pode mergulhar quantas vezes quiser, e cada vez que você mergulhar, irá gerar um item aleatório(cada dia muda o respawn).',
          imageWidthNatural: true,
          image: imgLocalMergulho,
        },
        {
          title: 'Dentro da ruína',
          description: 'Dentro da ruína você poderá encontrar as relíquias e plates, cada vez que você mergulhar, irá gerar um item aleatório(cada dia muda o respawn). Para que consiga ir no segundo andar, é necessário entrar na ruína e ir direto na **Pedra** ao centro da ruína economizando menos passos possíveis, senão não conseguirá passar e terá que entrar novamente para tentar.',
          imageWidthNatural: true,
          image: imgPrimeiraPedra
        },
      ]
    },
    {
      stepTitle: 'Mapas dos andares da ruína',
      steps: [ 
        {
          title: 'Mapa do primeiro andar',
          description: 'Marcação de amarelo são locais que podem ou não ter uma relíquia ou placa. Marcação rosa no centro é onde se encontra a pedra para se transferir de andar. O ponto branco é o portal de andar.',
          imageWidthNatural: true,
          image: imgFloor1
        },
        {
          title: 'Mapa do segundo andar',
          description: 'Marcação de amarelo são locais que podem ou não ter uma relíquia ou placa. Marcação rosa na esquerda é onde se encontra a pedra para se transferir de andar. O ponto branco é o portal de andar.',
          imageWidthNatural: true,
          image: imgFloor2
        },
        {
          title: 'Mapa do terceiro andar',
          description: 'Marcação de amarelo são locais que podem ou não ter uma relíquia ou placa. Marcação rosa na direita é onde se encontra a pedra para se transferir de andar. O ponto branco é o portal de andar.',
          imageWidthNatural: true,
          image: imgFloor3
        },
        {
          title: 'Mapa do quarto andar',
          description: 'No ponto amarelo no centro da sala poderá ou não ter a relíquia mais cara de todas, no caso a ![Relic Crown](https://img.pokemondb.net/sprites/items/relic-crown.png)**coroa**',
          imageWidthNatural: true,
          image: imgFloor4
        }
      ]
    },
    {
      stepTitle: 'Onde vender?',
      steps: [
        {
          title: 'Acumulou bastante relíquias? Não sabe aonde vende-las?',
          description: 'Você poderá vender todas as relíquias que encontrou no NPC **Billionaire Maniac** na região de Unova. Ele se encontra na cidade Undella Town dentro do PokeCenter',
          imageWidthNatural: true,
          image: imgUnovaUndellaPokemonCenterBillionaireManiac
        }
      ]
    }
  ],
  tips: [
    'Você poderá farmar todos os dias, em cada ponto irá respawn aleatóriamente uma relíquia, placa, ou nada.',
  ],
  images: [
    imgMovesNecessarios,
    imgLocalMergulho,
  ],
}
