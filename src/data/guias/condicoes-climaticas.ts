import type { ExpandedGuide } from './expanded-guide'
import imgCondicoesClimaticas from '/src/assets/guides/condicoes-climaticas/condicoes-climaticas.png'

export const condicoesClimaticasETerrenosGuide: ExpandedGuide = {
  slug: 'condicoes-climaticas-e-terrenos',
  title: 'Condições Climáticas e Terrenos',
  subtitle: 'Quais abilitys e moves são relacionados ao clima/terreno e como são afetados',
  description:
    'Pequeno guia explicativo sobre como chamar o clima/terreno e utiliza-lo ao seu favor.',
  summary: 'Imagem ilustrando algumas condições sobre determinados terrenos e climas.',
  image: imgCondicoesClimaticas,
  topics: ['Explicação clara de cada clima', 'Explicação clara de cada terreno'],
  steps: [
    {
      stepTitle: 'Climas ☀️⛈️🏜️🌨️',
      steps: [
        {
          title: '☀️ 1. Sol (Sun / Drought)',
          description: 'O Sol pode ser chamado por meio da habilidade Drought (Seca) de Pokémon do tipo Fire (ex: Torkoal, e Ninetales) ou pelo movimento Sunny Day (Dia de Sol).\n\n\u00a0\n\nQuando o Sol está ativo:\n- Aumenta o poder de ataques do tipo 🔥Fire em 50%;\n- Reduz o poder de ataques do tipo 💧Water em 50%.\n- Pode causar efeitos adicionais, como:\n  - Dobrar a velocidade de Pokémon com a habilidade Chlorophyll (Clorofila);\n  - Aumentar em 50% o Sp. Atk de Pokémon com a habilidade Solar Power (Poder Solar), que perdem 1/8 do HP máximo a cada turno;\n  - Impedir status alterados em Pokémon com a habilidade Leaf Guard (Guarda Folha);\n  - Reduzir a precisão de Thunder (Trovoada) e Hurricane (Furacão) para 50%.\n- No caso dos moves:\n  - Solar Beam (Raio Solar) e Solar Blade (Lâmina Solar) não precisam de um turno para carregar;\n  - Moonlight (Luar), Morning Sun (Sol da Manhã) e Synthesis (Síntese) recuperam 2/3 do HP máximo (em vez de 1/2);\n  - Growth (Crescimento) dobra o aumento de Atk e Sp. Atk;\n  - Weather Ball (Bola Climática) se torna do tipo Fire e tem seu poder dobrado.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Heat Rock (Pedra do Calor).',          
        },
        {
          title: '⛈️ 2. Chuva (Rain / Drizzle)',
          description: 'A Chuva pode ser chamada por meio da habilidade Drizzle (Garoa) de Pokémon do tipo Water (ex: Pelipper, Politoed) ou pelo movimento Rain Dance (Dança da Chuva).\n\n\u00a0\n\nQuando a Chuva está ativa:\n- Aumenta o poder de ataques do tipo 💧Water em 50%;\n- Reduz o poder de ataques do tipo 🔥Fire em 50%.\n- Pode causar efeitos adicionais, como:\n  - Dobrar a velocidade de Pokémon com a habilidade Swift Swim (Nado Rápido);\n  - Recuperar 1/16 do HP máximo por turno em Pokémon com a habilidade Rain Dish (Chuva Revigorante);\n  - Curar Pokémon com status alterado a cada turno com a habilidade Hydration (Hidratação);\n  - Recuperar HP (em vez de perder) em Pokémon com a habilidade Dry Skin (Pele Seca).\n- No caso dos moves:\n  - Thunder (Trovoada) e Hurricane (Furacão) nunca erram o alvo;\n  - Solar Beam (Raio Solar) e Solar Blade (Lâmina Solar) têm seu poder reduzido pela metade;\n  - Weather Ball (Bola Climática) se torna do tipo Water e tem seu poder dobrado.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Damp Rock (Pedra da Umidade).',
        },
        {
          title: '🏜️ 3. Tempestade de Areia (Sandstorm / Sand Stream)',
          description: 'A Tempestade de Areia pode ser chamada por meio da habilidade Sand Stream (Corrente de Areia) de Pokémon do tipo Ground/Rock (ex: Tyranitar, Hippowdon, Gigalith) ou pelo movimento Sandstorm (Tempestade de Areia).\n\n\u00a0\n\nQuando a Tempestade de Areia está ativa:\n- Causa dano de 1/16 do HP máximo por turno a Pokémon que não sejam do tipo ⛰️Rock, 🌍Ground ou ⚙️Steel;\n- Aumenta em 50% o Sp. Def de Pokémon do tipo ⛰️Rock.\n- Pode causar efeitos adicionais, como:\n  - Aumentar em 25% a evasão de Pokémon com a habilidade Sand Veil (Véu de Areia);\n  - Dobrar a velocidade de Pokémon com a habilidade Sand Rush (Investida de Areia);\n  - Aumentar em 30% o poder de moves dos tipos Rock, Ground e Steel em Pokémon com a habilidade Sand Force (Força de Areia).\n- No caso dos moves:\n  - Solar Beam (Raio Solar) e Solar Blade (Lâmina Solar) têm seu poder reduzido pela metade;\n  - Shore Up (Erguer Terra) recupera 2/3 do HP máximo (em vez de 1/2);\n  - Weather Ball (Bola Climática) se torna do tipo Rock e tem seu poder dobrado.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Smooth Rock (Pedra Lisa).',
        },
        {
          title: '🌨️ 4. Granizo (Hail / Snow Warning)',
          description: 'O Granizo pode ser chamado por meio da habilidade Snow Warning (Aviso de Neve) de Pokémon do tipo Ice (ex: Ninetales-Alola, Alolan Sandslash, Froslass) ou pelo movimento Hail (Granizo).\n\n\u00a0\n\nQuando o Granizo está ativo:\n- Causa dano de 1/16 do HP máximo por turno a Pokémon que não sejam do tipo ❄️Ice;\n- Não concede bônus de poder a nenhum tipo de ataque (diferente dos outros climas).\n- Pode causar efeitos adicionais, como:\n  - Recuperar 1/16 do HP máximo por turno em Pokémon com a habilidade Ice Body (Corpo de Gelo);\n  - Aumentar em 25% a evasão de Pokémon com a habilidade Snow Cloak (Manto de Neve);\n  - Dobrar a velocidade de Pokémon com a habilidade Slush Rush (Investida na Neve), introduzida nesta geração.\n- No caso dos moves:\n  - Blizzard (Nevasca) nunca erra o alvo;\n  - Aurora Veil (Véu de Aurora), introduzido nesta geração, só pode ser usado enquanto o Granizo estiver ativo;\n  - Solar Beam (Raio Solar) e Solar Blade (Lâmina Solar) têm seu poder reduzido pela metade;\n  - Weather Ball (Bola Climática) se torna do tipo Ice e tem seu poder dobrado.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Icy Rock (Pedra Gelada).',
        },
      ]
    },
    {
        stepTitle: 'Terrenos ⚡🌿🌸🔮',
        steps: [
        {
          title: '⚡ 1. Terreno Elétrico (Electric Terrain)',
          description: 'O Terreno Elétrico pode ser chamado por meio da habilidade Electric Surge (Surto Elétrico) de Pokémon do tipo Electric (ex: Tapu Koko) ou pelo movimento Electric Terrain (Terreno Elétrico).\n\n\u00a0\n\nQuando o Terreno Elétrico está ativo:\n- Aumenta em 50% o poder de ataques do tipo ⚡Electric usados por Pokémon que estejam no chão (grounded);\n- Impede que Pokémon no chão adormeçam (incluindo pelo move Rest e pelo Spore).\n- Pode causar efeitos adicionais, como:\n  - Dobrar a velocidade de Pokémon com a habilidade Surge Surfer (introduzida nesta geração, exclusiva do Alolan Raichu);\n  - Falhar o uso de Yawn (Bocejo) em Pokémon no chão.\n- No caso dos moves:\n  - Rising Voltage (Voltagem Crescente) tem seu poder dobrado contra alvos no chão;\n  - Terrain Pulse (Pulso do Terreno) se torna do tipo Electric.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Terrain Extender (Extensor de Terreno).',          
        },
        {
          title: '🌿 2. Terreno Gramado (Grassy Terrain)',
          description: 'O Terreno Gramado pode ser chamado por meio da habilidade Grassy Surge (Surto Gramado) de Pokémon do tipo Grass (ex: Tapu Bulu) ou pelo movimento Grassy Terrain (Terreno Gramado).\n\n\u00a0\n\nQuando o Terreno Gramado está ativo:\n- Aumenta em 50% o poder de ataques do tipo 🌿Grass usados por Pokémon que estejam no chão;\n- Recupera 1/16 do HP máximo, ao final de cada turno, de Pokémon no chão;\n- Reduz o poder de Earthquake (Terremoto), Bulldoze (Terra em Fúria) e Magnitude pela metade contra alvos no chão.\n- Pode causar efeitos adicionais, como:\n  - Nenhuma habilidade específica interage diretamente com este terreno nesta geração (diferente do Elétrico e Psíquico).\n- No caso dos moves:\n  - Terrain Pulse (Pulso do Terreno) se torna do tipo Grass.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Terrain Extender (Extensor de Terreno).',
        },
        {
          title: '🌸 3. Terreno Enevoado (Misty Terrain)',
          description: 'O Terreno Enevoado pode ser chamado por meio da habilidade Misty Surge (Surto Enevoado) de Pokémon do tipo Fairy (ex: Tapu Fini) ou pelo movimento Misty Terrain (Terreno Enevoado).\n\n\u00a0\n\nQuando o Terreno Enevoado está ativo:\n- Reduz em 50% o poder de ataques do tipo 🐉Dragon usados contra Pokémon no chão;\n- Impede que Pokémon no chão sejam afetados por status alterados (paralisia, queimadura, veneno, sono, congelamento) e pela confusão.\n- Pode causar efeitos adicionais, como:\n  - Nenhuma habilidade específica interage diretamente com este terreno nesta geração.\n- No caso dos moves:\n  - Terrain Pulse (Pulso do Terreno) se torna do tipo Fairy.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Terrain Extender (Extensor de Terreno).',
        },
        {
          title: '🔮 4. Terreno Psíquico (Psychic Terrain)',
          description: 'O Terreno Psíquico pode ser chamado por meio da habilidade Psychic Surge (Surto Psíquico) de Pokémon do tipo Psychic (ex: Tapu Lele) ou pelo movimento Psychic Terrain (Terreno Psíquico), introduzido nesta geração.\n\n\u00a0\n\nQuando o Terreno Psíquico está ativo:\n- Aumenta em 50% o poder de ataques do tipo 🔮Psychic usados por Pokémon que estejam no chão;\n- Impede que moves de prioridade (como Extreme Speed, Quick Attack, Sucker Punch) atinjam Pokémon no chão.\n- Pode causar efeitos adicionais, como:\n  - Nenhuma habilidade específica interage diretamente com este terreno nesta geração.\n- No caso dos moves:\n  - Terrain Pulse (Pulso do Terreno) se torna do tipo Psychic.\n- Duração:\n  - Dura 5 turnos, ou 8 turnos se ativado por um Pokémon segurando o item Terrain Extender (Extensor de Terreno).',
        },
      ]
    }
  ],
  tips: [],
  images: [],
}
