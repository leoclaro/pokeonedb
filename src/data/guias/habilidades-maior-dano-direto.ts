import type { ExpandedGuide } from './expanded-guide'

export const habilidadesMaiorDanoDiretoGuide: ExpandedGuide = {
  slug: 'habilidades-maior-dano-direto',
  title: 'Habilidade que fazem causar maior dano direto',
  subtitle: 'Habilidades que fazem um Pokémon causar o maior dano direto',
  description:
    'Pequeno guia explicativo sobre algumas habilidades que fazem um pokémon virar uma maquina de matar!',
  summary: '',
  image: '',
  topics: [],
  steps: [
    {
      stepTitle: 'Multiplicação de Atributos (Dano Massivo Passivo)',
      steps: [
        {
            title: 'Como funcionam?',
            description: 'Estas habilidades oferecem o maior teto de dano do jogo porque dobram o status real de ataque do Pokémon em vez de apenas aumentar o poder do golpe isolado.'
        },
        {
          title: 'Huge Power / Pure Power (Poder Puro)',
          description: 'Dobram (2x) o status de Attack físico do Pokémon. Um Pokémon como Azumarill ou Mega Mawile atinge números colossais de dano graças a isso. Outros exemplos são Medicham, Mega Medicham, e Diggersby.',
        },        
        {
          title: 'Gorilla Tactics',
          description: 'Aumenta o Ataque em 1.5x, mas trava o Pokémon no uso do primeiro golpe escolhido (semelhante ao item Choice Band). Exemplo: Galarian Darmanitan ( possui apenas a partir da oitava geração ).',
        },
        {
          title: 'Guts (Coragem)',
          description: 'Aumenta o Ataque em 50% (1.5x) quando o Pokémon está com uma condição de status (como queimadura, envenenado ou paralisado). Além disso, ela ignora a redução de dano que a queimadura normalmente causaria. Exemplos: Raticate, Machamp, Flareon, Ursaring, Heracross, Swellow, Hariyama, e Luxray.',
        },
        {
            title: 'Hustle',
            description: 'Aumenta em 1.5x o Attack físico de todos os golpes, mas reduz a precisão deles em 20%. Exemplos: Togekiss, Raticate de Alola, Deino, Durant',
        },
        {
            title: 'Solar Power',
            description: 'Aumenta em 1.5x o Special Attack sob a luz do sol (Sunny Day), drenando um pouco de vida do usuário a cada turno. Exemplos: Charizard, Mega Charizard Y, Sunflora, Tropius, Heliolisk',
        }
      ]
    },
    {
        stepTitle: 'Multiplicadores Condicionais Altos (Até 2x)',
        steps: [
            {
                title: 'Como funcionam?',
                description: 'Estas habilidades aumentam o poder base do movimento sob condições muito específicas na partida.'
            },
            {
                title: 'Stakeout',
                description: 'Dobra (2x) o dano do ataque se o Pokémon atingir um oponente que acabou de entrar em campo (substituição no mesmo turno). Exemplos: Yungoos e Gumshoos',
            },
            {
                title: 'Water Bubble',
                description: 'Dobra (2x) o poder base de qualquer ataque do tipo Água usado pelo Pokémon, além de protegê-lo contra queimaduras. Exemplos: Dewpider e Araquanid',
            },
            {
                title: 'Adaptability (Adaptabilidade)',
                description: 'Aumenta o bônus de STAB (Same-Type Attack Bonus), fazendo os golpes do mesmo tipo do Pokémon causarem 2x de dano em vez de 1.5x. Exemplos: Lucario, Porygon-Z, Eevee, Crawdaunt, Mega Lucario, Basculin, Dragalge, e Mega Beedrill.',
            },
        ]
    },
    {
        stepTitle: 'Modificadores de Tipo e Mecânicas (Bônus de 1.3x a 1.5x)',
        steps: [
            {
                title: 'Como funcionam?',
                description: 'Habilidades focadas em aumentar golpes específicos ou que alteram a tipagem para ganhar mais bônus.'
            },
            {
                title: 'Sharpness',
                description: 'Aumentam o dano de categorias de movimentos. Sharpness aumenta ataques de corte (ex: Sacred Sword) em 1.5x. (Nota: Esta habilidade só foi criada na 9ª Geração e distribuída retroativamente para Pokémon antigos como Gallade e Samurott)',
            },
            {
                title: 'Strong Jaw ',
                description: 'Aumentam o dano de categorias de movimentos. Strong Jaw aumenta mordidas em 1.5x. Exemplos: Mega Sharpedo, Tyrantrum, e Gumshoos',
            },
            {
                title: 'Iron Fist',
                description: 'Aumentam o dano de categorias de movimentos. Iron Fist aumenta socos em 1.2x. Exemplos: Hitmonchan , Ledian, Infernape, Golurk, e Pangoro.',
            },
            {
                title: 'Technician (Técnico)',
                description: 'Aumenta em 1.5x o poder de qualquer golpe que tenha poder base original de 60 ou menor (transformando golpes fracos em armas letais). Exemplos: Persian, Scyther, Scizor, Mega Scizor, Breloom, Ambipom, Cinccino, e Marshadow.',
            },
            {
                title: 'Sheer Force',
                description: 'Aumenta em 1.3x o dano de golpes que possuem efeitos secundários (como chance de queimar ou congelar), mas remove esses efeitos. Exemplos: Nidoking, Nidoqueen, Tauros, Feraligatr, Rampardos, Darmanitan, e Landorus.',
            },
            {
                title: 'Pixilate / Aerilate / Refrigerate / Galvanize',
                description: 'Transformam ataques do tipo Normal em Fada, Voador, Gelo e Elétrico, respectivamente, e adicionam um multiplicador de 1.2x no dano (além do bônus extra de STAB se o Pokémon for daquele tipo). Exemplos: Sylveon, Mega Altaria, Mega Pinsir, Mega Salamence, Mega Glalie, Aurorus, e Golem de Alola',
            },
        ]
    },
    {
        stepTitle: 'Habilidades de Clima/Terreno',
        steps: [
            {
                title: 'Como funcionam?',
                description: 'Estas habilidades aumentam o dano ativando condições de campo que fortalecem tipos específicos de ataques.'
            },
            {
                title: 'Drought / Drizzle',
                description: 'Ativam Sol e Chuva ao entrar em campo, o que aumenta automaticamente o dano de golpes do tipo Fogo (sob o Sol) e Água (sob a Chuva) em 1.5x. Exemplos: Ninetales,  Politoed, Groudon, Kyogre, Torkoal, e Pelipper',
            },
            {
                title: 'Electric / Grassy / Psychic / Misty Surge',
                description: 'Ativam terrenos ao entrar em campo. Os terrenos Elétrico, Psíquico e de Grama aumentam o dano de golpes dos seus respectivos tipos em 1.3x para Pokémon que estão tocando o chão. Exemplos: Tapu Koko (Elétrico), Tapu Bulu (Grama), Tapu Lele (Psíquico), e Tapu Fini'
            },
            {
                title:'Sand Rush / Slush Rush / Swift Swim',
                description:'Não aumentam o dano diretamente, mas dobram a Speed (Velocidade) no clima certo. Isso permite que golpes baseados em velocidade (como Electro Ball) causem muito mais dano.'
            }
        ]
    },
    {
        stepTitle: 'Habilidades de "Efeito Bola de Neve" (Aumento Progressivo)',
        steps: [
            {
                title: 'Como funcionam?',
                description: 'Estas habilidades começam normais, mas aumentam o seu status ofensivo à medida que a batalha avança.'
            },
            {
                title: 'Beast Boost / Moxie / Chilling Neigh / As One',
                description: 'Aumentam o Attack ou Special Attack em 1 nível (1.5x) toda vez que o Pokémon derrota um oponente. Exemplos: Krookodile, Scrafty (Moxie), Nihilego, Buzzwole, Kartana, e Celesteela (Beast Boost).'
            },
            {
                title: 'Supreme Overlord',
                description: 'Aumenta o dano do Pokémon em 1.1x por cada aliado derrotado no seu time (pode chegar a 1.5x se for o último Pokémon vivo) (Nota: Habilidade exclusiva de Kingambit, introduzido na 9ª Geração)'
            },
            {
                title: 'Rattled / Justified',
                description: 'Aumentam o Attack físico ou a velocidade quando o Pokémon é atingido por tipos específicos de golpes (como Sombrio ou Inseto)'
            },
            {
                title: 'Competitive / Defiant',
                description: 'Se o oponente tentar reduzir qualquer status do seu Pokémon (como usar Intimidate), essas habilidades aumentam o seu Attack ou Special Attack em 2 níveis (2x) de uma só vez. Exemplos: Primeape (Defiant), Bisharp, Tornadus (Defiant), Milotic (Competitive), Wigglytuff (Competitive), e Gothitelle (Competitive)'
            },
        ]
    },
    {
        stepTitle: 'Habilidades que Ignoram as Defesas do Oponente',
        steps: [
            {
                title: 'Como funcionam?',
                description: 'Em vez de aumentar o seu próprio poder, elas fazem o inimigo receber mais dano ignorando as mecânicas de defesa dele.'
            },
            {
                title: 'Unaware',
                description: 'Ignora completamente qualquer aumento de defesa ou defesa especial que o Pokémon adversário tenha acumulado.'
            },
            {
                title: 'Infiltrator',
                description: 'Ignora barreiras defensivas do oponente, como Reflect, Light Screen, Aurora Veil e Substitute, causando dano direto.'
            },
            {
                title: 'Sniper',
                description: 'Aumenta o dano de golpes críticos. Normalmente, um golpe crítico causa 1.5x de dano; com Sniper, ele passa a causar 2.25x de dano. Exemplos: Kingdra, Drapion, e Beedrill.'
            },
        ]
    },
    {
        stepTitle: 'Habilidades Ativadas por Pouca Vida (Bônus de 1.5x)',
        steps: [
            {
                title: 'Como funcionam?',
                description: 'As habilidades clássicas dos Pokémon iniciais aumentam o dano quando a situação está crítica.'
            },
            {
                title: 'Overgrow / Blaze / Torrent / Swarm',
                description: 'Aumentam o poder de golpes do tipo Grama, Fogo, Água e Inseto em 1.5x se a vida do Pokémon cair para menos de 33%. Exemplos: Venusaur, Charizard, Blastoise, Decidueye, Incineroar, e Primarina.'
            },
        ]
    }
  ],
  tips: [],
  images: [],
}
