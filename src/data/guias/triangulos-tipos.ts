import type { ExpandedGuide } from './expanded-guide'
import imgTriangulosTipos from '/src/assets/guides/triangulos-tipos/triangulos-tipos.png'

export const triangulosTiposGuide: ExpandedGuide = {
  slug: 'triangulos-tipos',
  title: 'Triângulos de Tipos',
  subtitle: 'Guia Completo de Triângulos de Tipos em Pokémon.',
  description:
    'Este guia analisa a mecânica dos triângulos de tipos — trios de tipos onde cada um é super eficaz contra o seguinte no ciclo.',
  summary:
    'Imagem ilustrativa de alguns triângulos de tipos.',  
  image: imgTriangulosTipos,
  topics: ['Triângulos Perfeitos', 'Triângulos Imperfeitos', 'Triângulos Monotipos'],
  steps: [
    {
      stepTitle: 'O que são?',
      steps: [
        {          
          description: "Triângulo é o termo utilizado para descrever um trio de tipos onde cada tipo é super eficaz contra o seguinte no ciclo. Por exemplo, o triângulo de tipos Fogo, Planta e Água é um triângulo perfeito, pois Fogo é super eficaz contra Planta, Planta é super eficaz contra Água, e Água é super eficaz contra Fogo.\n\n\u00a0\n\nSem mais delongas, vamos começar a exibir os triângulos de tipos no Pokémon.",
        },
      ]
    },
    {
      stepTitle: '📂 As Três Categorias de Triângulos',
      steps: [
        {
          title: '1. Triângulos Perfeitos (4 no total)',
          description: 'Para um triângulo ser considerado perfeito, ele tem de cumprir dois requisitos estritos:\n- **Ataque**: Ciclo fechado de super eficácia (A → B → C → A).\n- **Defesa**: Cada tipo deve resistir ao tipo contra o qual é super eficaz.\n- Resultado: Nenhum tipo tem uma vantagem injusta sobre o outro fora do ciclo natural.',
        },
        {
          title: '2. Triângulos Imperfeitos (10 no total)',
          description: 'Estes triângulos completam o ciclo de super eficácia, mas falham no equilíbrio de resistências. Isto acontece devido a imunidades completas (que anulam o dano neutro) ou porque um dos tipos não resiste ao tipo que deveria (o tipo Gelo, por exemplo, não tem resistências suficientes para equilibrar os seus triângulos).',        
        },
        {
          title: '3. Triângulos Monotipos (2 no total)',
          description: 'São triângulos compostos por um único tipo que é super eficaz contra si mesmo (Fantasma e Dragão). Embora perfeitamente equilibrados, eles também poderiam formar quadrados, pentágonos ou linhas simples.',        
        },
      ]
    },
    {
      stepTitle: 'Tabelas de Triângulos dos Tipos',
      steps: [ 
        {
          title: 'Triângulos Perfeitos',                         
          description: `| Tipagens | \u00a0\u00a0\u00a0Força / Fraqueza\u00a0\u00a0\u00a0 | Notas de Design & Curiosidades |
| :--- | :---: | :--- |
| \u00a0
| 🌿Planta / 🔥Fogo / 💧Água | Perfeito | O trio inicial clássico e mais reconhecível de toda a franquia. |
| | | Água -> Planta 1/2x; Planta -> Fogo 1/2x; Fogo -> Água 1/2x. |
| \u00a0
| 🌿Planta / 🌍Terrestre / ☠️Veneno | Perfeito | O único triângulo perfeito que utiliza o tipo Veneno. Nota que o tipo Terrestre possui imunidade elétrica(não faz parte deste triângulo), se destacando. |
| | | Terrestre -> Planta 1/2x; Veneno -> Terrestre 1/2x; Planta -> Veneno 1/2x. |
| \u00a0
| ⚙️Aço / ⛰️Rocha / 🔥Fogo | Perfeito | Uma excelente opção temática para uma região vulcânica ou industrial. Nota: todos partilham uma fraqueza comum, a Terrestre. |
| | | Aço -> Fogo 1/2x; Rocha -> Aço 1/2x; Fogo -> Rocha 1/2x. |
| \u00a0
| 🦅Voador / 👊Lutador / ⛰️Rocha | Perfeito | A melhor alternativa para novos iniciais. É o único triângulo perfeito fora do eixo clássico Planta/Fogo/Água que não utiliza nenhum desses três tipos. |
| | | Rocha -> Lutador 1/2x; Voador -> Rocha 1/2x; Lutador -> Voador 1/2x. |`,
        },
        {
          title: 'Triângulos Imperfeitos',                         
          description: `| Tipagens | \u00a0\u00a0\u00a0Força / Fraqueza\u00a0\u00a0\u00a0 | Notas de Design & Curiosidades |
| :--- | :---: | :--- |
| \u00a0
| 🧠Psíquico / 👊Lutador / 🌑Escuridão | Escuridão > Psíquico | O tipo Escuridão é imune a Psíquico, quebrando o equilíbrio defensivo. Ficou famoso como a tipagem secundária dos iniciais de Kalos. Psíquico tem a maior desvantagem. |
| | | Psíquico -> Escuridão 0x; Escuridão -> Lutador 1/2x; Lutador -> Psíquico 1/2x. |
| \u00a0
| 💧Água / 🌍Terrestre / ⚡Elétrico | Terrestre > Elétrico | Terrestre é imune a Elétrico, deixando o tipo Elétrico em enorme desvantagem. |
| | | Terrestre -> Água 1x; Elétrico -> Terrestre 0x; Água -> Elétrico 1x. |
| \u00a0
| ⚙️Aço / 🧚Fada / 👊Lutador | Lutador > Aço | Aço não resiste a Lutador. Tematicamente, representa uma clássica "Trilogia RPG": Guerreiro/Bárbaro (Lutador), Mago/Clérigo (Fada) e Cavaleiro/Paladino (Aço). |
| | | Fada -> Aço 1/2x; Lutador -> Fada 1/2x; Aço -> Lutador 1x. |
| \u00a0
| 🌿Planta / ⛰️Rocha / 🔥Fogo | Desequilíbrio de Rocha | Planta não resiste a Rocha. |
| | | Planta -> Fogo 1/2x; Rocha -> Planta 1x; Fogo -> Rocha 1/2x. |
| \u00a0
| 🌿Planta / ⛰️Rocha / ❄️Gelo | Sem resistências | Gelo não possui resistências fora de si próprio. Planta não resiste a Rocha. Rocha não resiste a Gelo. |
| | | Planta -> Gelo 1x; Rocha -> Planta 1x; Gelo -> Rocha 1x. |
| \u00a0
| 🌿Planta / ⛰️Rocha / 🐛Inseto | Rocha e Inseto em desvantagem | Planta não resiste a Rocha. Rocha não resiste a Inseto. |
| | | Planta -> Inseto 1/2x; Rocha -> Planta 1x; Inseto -> Rocha 1x. |
| \u00a0
| 🌿Planta / ⛰️Rocha / 🦅Voador | Desequilíbrio de Rocha | Planta não resiste a Rocha. Voador puro é extremamente raro como tipo primário (ex: Noivern). |
| | | Voador -> Rocha 1/2x; Planta -> Voador 1/2x; Rocha -> Planta 1x. |
| \u00a0
| ❄️Gelo / 🌍Terrestre / 🔥Fogo | Gelo e Terrestre em desvantagem | Gelo e Terrestre sofrem pela falta de resistências na tabela de tipos atual. |
| | | Gelo -> Fogo 1/2x; Terrestre -> Gelo 1x; Fogo -> Terrestre 1x. |
| \u00a0
| ❄️Gelo / 🌍Terrestre / ⚙️Aço | Gelo e Terrestre em desvantagem | O desequilíbrio defensivo do Gelo e Terrestre impede a perfeição.  |
| | | Gelo -> Aço 1/2x; Terrestre -> Gelo 1x; Aço -> Terrestre 1x. |
| \u00a0
| 🦅Voador / 👊Lutador / ❄️Gelo | Lutador em desvantagem | O tipo Lutador quebra a harmonia das resistências deste ciclo. |
| | | Voador -> Gelo 1x; Gelo -> Lutador 1x; Lutador -> Voador 1/2x; |`,
        },
        {
          title: 'Triângulos Monotipos',                         
          description: `| Tipagens | \u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0 | Força / Fraqueza |
| :--- | :---: | :--- |
| 👻Fantasma / 👻Fantasma / 👻Fantasma |  | Eficaz contra si mesmo. |
| 🐉Dragão / 🐉Dragão / 🐉Dragão | | Eficaz contra si mesmo. |`,
        },
      ]
    },
    {
      stepTitle: '💡 Curiosidade',
      steps: [
        {
          description: `- **O fenómeno Planta e Rocha**: A dupla Planta e Rocha aparece em 4 triângulos imperfeitos diferentes (com Fogo, Gelo, Inseto e Voador). Isso ocorre porque todos os tipos que a Rocha atinge com dano super eficaz também batem super eficaz em Planta.
          \n- **O Desafio das Evoluções com Voador Primário**: No triângulo Planta / Rocha / Voador, se quisermos usar apenas Pokémon com tipo primário Voador que evoluam, a linha do Noivern é a única opção viável. A linha do Corviknight perde o equilíbrio assim que evolui para o estágio final, porque o tipo Aço secundário resiste a Rocha.`,

        }
      ]
    }
  ],
  tips: [],
  images: [],
}