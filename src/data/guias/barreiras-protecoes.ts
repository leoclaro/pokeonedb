import type { ExpandedGuide } from './expanded-guide'
import imgBarreirasEProtecoes from '/src/assets/guides/barreiras-protecoes/barreiras-e-protecoes.fw.png'

export const barreirasProtecoesGuide: ExpandedGuide = {
  slug: 'barreiras-e-protecoes',
  title: 'Barreiras e Proteções',
  subtitle: 'Quais as barreiras e proteções existentes',
  description:
    'Pequeno guia explicativo sobre barreiras e proteções existentes no pokemon.',
  summary: 'Imagem ilustrando como funciona as habilidades de barreira e proteções',
  image: imgBarreirasEProtecoes,
  topics: ['🛡️ Barreiras', '⚔️ Ataques que penetram / ignoram'],
  steps: [
    {
      stepTitle: '🛡️ Barreiras',
      steps: [
        {
          title: '',
          description: 'No jogo existem barreiras e proteções como:\n\n- Reflect: reduz dano físico.\n\n- Light Screen: reduz dano especial.\n\n- Safeguard: impede que o seu Pokémon e toda a sua equipe sofram condições de status (como envenenamento, paralisia, queimadura e sono) e confusão.\n\n- Mist: protege sua equipe por 5 turnos, impedindo que os atributos (como Ataque e Defesa) do seu Pokémon sejam diminuídos por habilidades ou movimentos dos adversários.\n\n- Aurora Veil: funciona como uma combinação poderosa entre os movimentos Reflect e Light Screen, reduzindo pela metade o dano de ataques físicos e especiais sofridos por toda a sua equipe.\n\n- Substitute: sacrifica 25% do HP do seu Pokémon para criar um clone. Ele bloqueia dano direto e impede que seu Pokémon sofra efeitos de status ou reduções de atributos até ser destruído. É uma excelente estratégia para proteger seu Pokémon e ganhar turnos para usar movimentos de fortalecimento.',
          image: '',
        }        
      ]
    }, 
    {
      stepTitle: '⚔️ Ataques e habilidades que penetram / ignoram',
      steps: [
        {
          title: 'Infiltrator',
          description: 'O Infiltrator é extremamente útil para quebrar estratégias defensivas comuns em jogos de Pokémon.\nEle anula os seguintes efeitos do lado inimigo:\n\n- Substitute: O seu Pokémon ignora o boneco substituto e atinge a vida real do adversário diretamente.\n\n- Barreiras de dano: Efeitos como Reflect (reduz dano físico) e Light Screen (reduz dano especial) são ignorados, causando o dano normal.\n\n- Reduções de status e climas: Golpes que aplicam estados são aplicados normalmente através de proteções como Safeguard, Mist e Aurora Veil.',
          image: '',
        },
        
      ]
    }   
  ],
  tips: [],
  images: [],
}
