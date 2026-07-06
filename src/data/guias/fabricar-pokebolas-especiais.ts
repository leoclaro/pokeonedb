import type { ExpandedGuide } from './expanded-guide'
import imgAzaleaTownWhiteApricorn from '/src/assets/guides/fabricar-pokebolas-especiais/azalea-town-white-apricorn.png'
import imgAzaleaTownNpcKurt from '/src/assets/guides/fabricar-pokebolas-especiais/azalea-town-npc-kurt.png'
import imgListApricorn from '/src/assets/guides/fabricar-pokebolas-especiais/list-apricorn.png'
import imgApricornPokebolas from '/src/assets/guides/fabricar-pokebolas-especiais/apricorn-pokebolas.png'
import imgWorldMapAzaleaTown from '/src/assets/guides/fabricar-pokebolas-especiais/world-map-azalea-town.png'
import imgCabanaFabricarPokebolasEmAzaleaTown from '/src/assets/guides/fabricar-pokebolas-especiais/cabana-fabricar-pokebolas-em-azalea-town.png'

export const fabricarPokebolasEspeciaisGuide: ExpandedGuide = {
  slug: 'fabricar-pokebolas-especiais',
  title: 'Fabricar Pokébolas Especiais',
  subtitle: 'Como fabricar pokébolas especiais com Apricorns e resgatar no NPC',
  description:
    'Descubra como fabricar pokébolas especiais usando Apricorns e resgatar essas pokébolas no NPC da cidade de Azalea Town em Johto.',
  summary:
    'Arvore possuindo a White Apricorn',
  image:
    imgAzaleaTownWhiteApricorn,
  topics: ['O que são Apricorns', 'Onde consigo apricorns', 'Como fabricar pokébolas especiais', 'Onde resgatar as pokébolas especiais'],
  steps: [
    {
      stepTitle: "O que são e como adquirir os Apricorns?",
      steps: [
        {
          title: '',
          description: 'Apricorns são frutas que podem ser usadas para construir Pokébolas. Eles crescem na região de Johto, porém podem se adquiridas como recompensas de Boss diário.',
          image: [imgListApricorn,imgAzaleaTownWhiteApricorn],
          imageWidthNatural: true,
        },
      ]
    },
    {
      stepTitle: "Quais pokébolas especiais consigo fabricar com cada uma delas?",
      steps: [
        {
          title: '',
          description: 'Você consegue fabricar essas Pokébolas especiais com esses determinado Apricorns',
          image: imgApricornPokebolas,
          imageWidthNatural: true,
        },
      ]
    },
    
    {
      stepTitle: "Onde fabrico e resgato essas pokébolas especiais?",
      steps: [
        {
          title: 'World Map - Johto - Azalea Town',
          description: 'Basta utilizar fly até chegar nessa cidade.',
          image: imgWorldMapAzaleaTown,
          imageWidthNatural: true,
        },
        {
          title: 'Cabana do Vovô',
          description: 'Ande para esquerda do centro pokemon até avistar essa cabana com uma arvore de white apricorn na frente, e entrar dentro dela.',
          image: imgCabanaFabricarPokebolasEmAzaleaTown,
          imageWidthNatural: true,
        },
        {
          title: 'Trocar ideia com o Vovô',
          description: 'Agora você irá conversar com vovô, e ele irá solicitar 3 appricorn do mesmo tipo para fabricação de uma pokebola, você pode fazer por dia até 3 pedidos a ele. Porém ele irá te entregar apenas no dia posterior as pokebolas especiais fabricadas.',
          image: imgAzaleaTownNpcKurt,
          imageWidthNatural: true,
        },
      ]
    }
  ],
  tips: [
    'Você poderá fazer até 20 pontos ao dia por região',
    'Você poderá fazer até 100 pontos por semana por região',
    'Você poderá fazer até 300 pontos por mês por região',
    'Se você realizou qualquer doação de pacote ao servidor, poderá resgatar 1 shiny pokemon depois de completar os 300 pontos no NPC perto dos trofeus na sala de resgate',
    'Resgate seus pontos antes do mês resetar',
  ],
  images: [
    imgAzaleaTownWhiteApricorn,
    imgAzaleaTownNpcKurt,
    imgListApricorn,
    imgApricornPokebolas,
    imgWorldMapAzaleaTown,
    imgCabanaFabricarPokebolasEmAzaleaTown
  ],
}
