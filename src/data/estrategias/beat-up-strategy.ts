import type { ExpandedStrategy } from './expanded-strategy'

export const beatUpStrategy: ExpandedStrategy = {
  slug: 'beat-up-strategy',
  title: 'Estratégia utilizando o move Beat Up',
  subtitle: 'Combo utilizando Lucario ou Terrakion com Beat Up para alcançar o dano máximo em um único turno',
  description:
    'Nesse pequeno guia estrategia, vamos aprender a utilizar o combo com o move Beat UP para alcançar o dano máximo em um único turno!',
  summary: '',
  image: '',
  topics: [],
  steps: [
    {
      stepTitle: 'Explicação Teórica',
      steps: [
        {
          title: 'Como funciona?',
          description: 'Para fazer essa estratégia funcionar e alcançar o dano máximo logo no Turno 1, você precisa jogar no formato de Batalhas em Dupla ou Trio.\n\nO objetivo é fazer o seu Pokémon mais rápido atacar o seu próprio aliado com o golpe Beat Up (Surra). Esse golpe ataca uma vez para cada Pokémon saudável no seu time. Como cada golpe conta como um ataque separado do tipo Sombrio, ele vai ativar a habilidade Justified quatro vezes seguidas (se você tiver 4 Pokémon inteiros na equipe), colocando o Attack do seu aliado no nível máximo (+4 ou 3x mais dano) instantaneamente.\n\nAbaixo vou ensinar como montar o combo perfeito',            
        },
        {
          title: 'O Ativador (Pokémon Rápido)',
          description: 'Você precisa de um Pokémon que seja extremamente rápido e que aprenda Beat Up, de preferência com um status de Attack baixo para não machucar muito o seu próprio aliado.\n\n- Whimsicott: é a melhor escolha. Ele tem a habilidade Prankster, que faz o golpe Beat Up ter prioridade (+1) e atacar antes de qualquer oponente.\n\n- Weavile ou Dugtrio de Alola: também funcionam por causa da velocidade natural altíssima deles.',
        },        
        {
          title: 'O Atacante (O Usuário de Justified)',
          description: '- Terrakion (Gen 5) ou Lucario (Gen 4).\n\n- Item recomendado: Life Orb (aumenta o dano em mais 1.3x) ou Weakness Policy (se o ativador causar um dano super efetivo de leve, aumenta ainda mais o Attack e Special Attack).',
        }
      ]
    },
    {
      stepTitle: 'Explicação Prática',
      steps:[
        {
          title: 'O Passo a Passo no Turno 1',
          description: '1 - Abertura: Você entra em campo com Whimsicott e Terrakion lado a lado.\n\n2 - O Ataque Aliado: Whimsicott usa Beat Up focado no seu próprio Terrakion.\n\n3 - A Ativação: O golpe vai acertar Terrakion 4 vezes, causando um dano mínimo (já que o ataque do Whimsicott é fraco). A cada hit, a habilidade Justified é ativada.\n\n4 - Resultado: O Attack de Terrakion sobe para +4 estágios em menos de dois segundos.\n\n5 - A Destruição: No mesmo turno, Terrakion (que também é muito rápido) usa um golpe em área como Rock Slide (Deslizamento de Rocha). Com o bônus de 3x de dano, ele tem grandes chances de nocautear os dois Pokémon adversários de uma só vez.'
        }
      ]
    },
    {
      stepTitle: 'Como se proteger contra essa estratégia?',
      steps: [
        {
          description: 'Se você estiver enfrentando esse combo, o ponto fraco dele é o Whimsicott. Golpes com prioridade que causem flinch (como Fake Out) ou golpes do tipo Follow Me (que redirecionam o Beat Up para outro alvo) quebram a estratégia completamente.'
        }
      ]
    },
    {
      stepTitle: 'Setup da Dupla',
      steps: [
        {
          description: 'Aqui está a ficha de treinamento (Build) para a dupla Whimsicott e Terrakion.\nEsta combinação foi desenhada especificamente para o formato de Duplas e Trio.'
        },
        {
          title: 'O Ativador: Whimsicott',
          description: 'Sua única função é ser o mais rápido possível para ativar o Terrakion e dar suporte ao time.\n- Habilidade: Prankster (Garante prioridade +1 para golpes de status, como Taunt e Tailwind).\n- Item: Focus Sash (Garante que ele sobreviva com 1 de vida a qualquer ataque forte no Turno 1).\n- Nature (Natureza): Timid (+Velocidade, -Ataque Físico. Isso é vital para o Beat Up causar o menor dano possível no seu Terrakion).\n- Distribuição de EVs: 4 HP / 252 Special Attack / 252 Speed.\n\nAtaques (Moveset):\n- Beat Up: O golpe do combo. Deve ser usado no Terrakion no Turno 1.\n- Tailwind: Dobra a velocidade do seu time por 4 turnos. Use se o time adversário também for muito rápido.\n- Taunt: Impede o oponente de usar golpes de status (como Trick Room ou Follow Me que estragariam sua estratégia).\n- Moonblast: Para o Whimsicott não ficar totalmente sem dano caso precise atacar no fim do jogo.'
        },
        {
          title: 'O Atacante: Terrakion',
          description: 'O monstro que vai receber o bônus e varrer o campo adversário.\n- Habilidade: Justified (Ganha +1 de Ataque para cada hit do Beat Up).\n- Item: Life Orb (Aumenta todo o dano dele em mais 1.3x) ou Lum Berry (Para evitar que o oponente o congele, durma ou queime).\n- Nature (Natureza): Jolly (+Velocidade, -Ataque Especial. Garante que ele ataque antes da maioria dos inimigos após o combo).\n- Distribuição de EVs: 4 HP / 252 Attack / 252 Speed.\n\nAtaques (Moveset):\n- Rock Slide: Golpe principal. Causa dano massivo nos dois oponentes ao mesmo tempo e tem 30% de chance de fazê-los hesitar (flinch).\n- Close Combat: Golpe devastador do tipo Lutador focado em um único alvo para derrubar Pokémon extremamente defensivos.\n- Protect: Essencial em duplas. Use para se proteger caso preveja um ataque duplo focado no Terrakion.\n- Iron Head ou Poison Jab: Golpe de cobertura para lidar com Pokémon do tipo Fada que ameaçam o Terrakion.'
        }
      ]
    },
    {
      stepTitle: 'Dica de Combate no Turno 1',
      steps: [
        {
          description: 'Se você notar que o adversário tem um Pokémon com o golpe Fake Out (como Incineroar ou Kangaskhan), eles vão tentar travar o seu Whimsicott. Nesse caso, comece o turno usando Protect com o Terrakion e Tailwind com o Whimsicott, deixando para ativar o combo de Beat Up apenas no Turno 2!'
        }
      ]
    }
  ],
  tips: [],
  images: [],
}
