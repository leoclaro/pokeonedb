export interface GuideStep {
  title: string
  description: string
  image?: string | string[],
  imageWidthNatural?: boolean
}

export interface ExpandedGuide {
  slug: string
  title: string
  subtitle: string
  description: string,
  imageIsOnlyCard?: boolean,
  image: string
  summary: string
  topics: string[]
  steps: GuideStep[]
  tips?: string[]
  images?: string[]
}

export const seviiIslandDailiesGuide: ExpandedGuide = {
  slug: 'termos-funcoes-setups',
  title: 'Termos e Funções',
  subtitle: 'Guia de termos e funções de setups',
  description:
    'O guia prático a seguir detalha os principais termos e funções de setup essenciais para a montagem e a execução de uma equipe competitiva.',
  summary:
    'Um guia completo para as tarefas diárias, recompensas e pontos de interesse das Ilhas Sevii.',
  image:
    '',
  topics: ['⚔️ Estruturas e Funções no Time (Ataque e Ofensiva)', '🛡️ Controle de Campo e Suporte (Enablers e Defesa)'],
  steps: [
    {
      title: 'Sweeper',
      description: 'Pokémon focado em "varrer" o time inimigo, entrando em campo para nocautear vários oponentes seguidos após as ameaças sumirem.',
      image: '',
    },
    {
      title: 'Setup Sweeper',
      description: 'Um atacante que usa movimentos de aumento de atributos (como *Swords Dance* ou *Calm Mind*) para se tornar imparável.',
      image: '',
    },
    {
      title: 'Wallbreaker',
      description: 'Pokémon com poder de ataque bruto absurdamente alto, usado no início ou meio do jogo para quebrar os defensores mais resistentes do rival.',
      image: '',
    },
    {
      title: 'Revenge Killer',
      description: 'Um atacante muito veloz (ou que usa golpes de prioridade) que entra em campo logo após um aliado ser derrotado para nocautear o oponente enfraquecido.',
      image: '',
    },
  ],
  tips: [
    'Comece cedo para evitar congestionamento de jogadores',
    'Use Pokémon com tipos vantajosos contra os inimigos comuns',
    'Guarde itens raros para trocar por recompensas maiores',
  ],
  images: [],
}
