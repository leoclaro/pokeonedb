export interface Guide {
  slug: string
  title: string
  subtitle: string
  description: string
  image: string
  summary: string
  topics: string[]
}

export const guides: Guide[] = [
  {
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
  },
  {
    slug: 'kanto-dailies',
    title: 'Kanto Dailies',
    subtitle: 'O ciclo diário em Kanto para jogadores avançados',
    description:
      'Descubra o melhor caminho para cumprir tarefas diárias em Kanto e maximizar suas recompensas sem perder tempo.',
    summary:
      'Planejamento diário para treinar, caçar Pokémon e completar missões em Kanto.',
    image:
      'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=1000&q=80',
    topics: ['Rota de missões', 'Farm de experiência', 'Pontos de coleta', 'Melhores treinadores'],
  },
  {
    slug: 'general-strategy',
    title: 'General Strategy',
    subtitle: 'Estratégias gerais para subir de nível e competir',
    description:
      'Táticas e conselhos para evoluir seu time, completar eventos e manter uma progressão equilibrada no jogo.',
    summary:
      'Estratégias universais para qualquer jogador de PokeOne, desde iniciante até veterano.',
    image:
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
    topics: ['Construção de time', 'Economia do jogo', 'PvP e PvE', 'Gerenciamento de itens'],
  },
  {
    slug: 'sevii-bosses',
    title: 'Sevii Island Bosses',
    subtitle: 'Como derrotar os bosses das Ilhas Sevii',
    description:
      'Guia de chefes com fraquezas, estratégias e recomendações de equipe para cada boss das Ilhas Sevii.',
    summary:
      'Planejamento de combate e composição de time ideal para cada boss das Sevii.',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1000&q=80',
    topics: ['Chefes principais', 'Fraquezas elementares', 'Composições recomendadas', 'Recompensas'],
  },
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}
