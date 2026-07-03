export interface GuideStep {
  title: string
  description: string
  image?: string
}

export interface ExpandedGuide {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  summary: string
  topics: string[]
  steps: GuideStep[]
  tips?: string[]
  images?: string[]
}

export const seviiIslandDailiesGuide: ExpandedGuide = {
  slug: 'sevii-island-dailies',
  title: 'Sevii Island Dailies',
  subtitle: 'Rotina diária perfeita para as ilhas Sevii',
  description:
    'Aprenda quais missões e recursos fazer todos os dias nas Ilhas Sevii para manter seu progresso rápido e eficiente.',
  summary:
    'Um guia completo para as tarefas diárias, recompensas e pontos de interesse das Ilhas Sevii.',
  image:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
  topics: ['Missões diárias', 'Farm de itens raros', 'Mapas cruciais', 'Dicas de batalha'],
  steps: [
    {
      title: 'Chegada nas Ilhas Sevii',
      description: 'Comece verificando o NPC de missões diárias no porto principal.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Coleta de Recursos',
      description: 'Reúna itens especiais nas áreas específicas de cada ilha.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Cumprimento de Missões',
      description: 'Complete as 5 missões diárias para ganhar recompensas máximas.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    },
    {
      title: 'Battling de Chefes',
      description: 'Enfrente os chefes opcionais para ganhar mais experiência e itens raros.',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    },
  ],
  tips: [
    'Comece cedo para evitar congestionamento de jogadores',
    'Use Pokémon com tipos vantajosos contra os inimigos comuns',
    'Guarde itens raros para trocar por recompensas maiores',
  ],
  images: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
  ],
}
