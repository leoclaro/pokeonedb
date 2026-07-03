import type { ExpandedGuide } from './expanded-guide'
import imgSistemaPontuacaoUnovaRewardHall from '/src/assets/guides/sistema-pontuacao/unova-castelia-reward-hall.png'
import imgUnovaReward300Points from '/src/assets/guides/sistema-pontuacao/unova-reward-300-points.png'
import imgUnovaRewardPokemon from '/src/assets/guides/sistema-pontuacao/unova-reward-pokemon.png'
import imgComandoPointsPve from '/src/assets/guides/sistema-pontuacao/comando-points-pve.png'
import imgUnovaCastelia from '/src/assets/guides/sistema-pontuacao/unova-castelia.png'
import imgKantoCeladon from '/src/assets/guides/sistema-pontuacao/kanto-celadon.png'
import imgJohtoGoldenrod from '/src/assets/guides/sistema-pontuacao/johto-goldenrod.png'

export const kantoDailiesGuide: ExpandedGuide = {
  slug: 'kanto-dailies',
  title: 'Sistema de Pontuação',
  subtitle: 'Como pontuar e resgatar as recompensas PVE',
  description:
    'Descubra o melhor caminho para cumprir tarefas diárias em Kanto e maximizar suas recompensas sem perder tempo.',
  summary:
    'Sala de recompensas de Unova',
  image:
    imgSistemaPontuacaoUnovaRewardHall,
  topics: ['O que é o Sistema de Pontuação', 'Onde resgato as recompensas'],
  steps: [
    {
      stepTitle: "O que é o Sistema de Pontuação?",
      steps: [
        {
          title: '',
          description: 'Sistema de pontuação é um recurso que permite aos jogadores acumular pontos ao completar tarefas diárias em Kanto, Johto, e Unova. Esses pontos podem ser trocados por recompensas exclusivas, como itens raros e Pokémon especiais.',
          image: [imgUnovaReward300Points, imgUnovaRewardPokemon],
          imageWidthNatural: true,
        },
      ]
    },
    {
      stepTitle: "Como consigo os pontos?",
      steps: [
        {
          title: '',
          description: 'Para ganhar pontos, você precisa completar tarefas diárias específicas em cada região, como fazer os boss diarios, e as missões da Officer Jenny. Cada tarefa concluída concede uma quantidade determinada de pontos, que são acumulados ao longo do tempo.\n\nLembrando que você pode obter até 20 pontos ao dia, 100 pontos por semana, e 300 pontos por mês por região.',
          image: ''
        },
      ]
    },
    {
      stepTitle: "Como Confiro Meus Pontos?",
      steps: [
        {
          title: '',
          description: 'Para conferir seus pontos, basta digitar no chat /points pve e apertar enter. O sistema irá mostrar a quantidade de pontos que você possui, bem como o limite diário, semanal e mensal.',
          image: imgComandoPointsPve,
          imageWidthNatural: true,
        },
      ]
    },
    {
      stepTitle: "Onde eu resgato meus pontos?",
      steps: [
        {
          title: 'Unova - Castelia City',
          description: 'Os pontos referentes a região de Unova você pode resgatar na cidade de Castelia ( Castelia City )',
          image: imgUnovaCastelia,
          imageWidthNatural: true,
        },
        {
          title: 'Johto - Goldenrod City',
          description: 'Os pontos referentes a região de Johto você pode resgatar na cidade de Goldenrod ( Goldenrod City )',
          image: imgJohtoGoldenrod,
          imageWidthNatural: true,
        },
        {
          title: 'Kanto - Celadon City',
          description: 'Os pontos referentes a região de Kanto você pode resgatar na cidade de Celadon ( Celadon City )',
          image: imgKantoCeladon,
          imageWidthNatural: true,
        },
      ]
    },
    {
      stepTitle: "Atenção",
      steps: [{
        title:'',
        description: 'Se você realizou qualquer doação de pacote ao servidor, poderá resgatar 1 shiny pokemon depois de completar os 300 pontos no NPC perto dos trofeus na sala de resgate.\n\nCaso não tenha feito doação, podera assim mesmo pegar 1 pokemon (não shiny) por região',
        image: imgUnovaRewardPokemon
      }]
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
    imgUnovaReward300Points,
    imgUnovaRewardPokemon,
    imgUnovaCastelia,
    imgJohtoGoldenrod,
    imgKantoCeladon
  ],
}
