import type { ExpandedStrategy } from './expanded-strategy'
import imgBeatUpStrategy from '/src/assets/strategies/beat-up-strategy/beat-up-strategy.png'

export const beatUpStrategy: ExpandedStrategy = {
  slug: 'beat-up-strategy',
  title: 'Estratégia utilizando o move Beat Up',
  subtitle: 'Combo utilizando Lucario ou Terrakion com Beat Up para alcançar o dano máximo em um único turno',
  description:
    'Nesse pequeno guia estrategia, vamos aprender a utilizar o combo com o move Beat UP para alcançar o dano máximo em um único turno!',
  summary: 'Imagem ilustrando sobre a estratégia de Beat Up com Lucario ou Terrakion.',
  image: imgBeatUpStrategy,
  topics: [],
  steps: [
    {
      stepTitle: 'Explicação Teórica',
      steps: [
        {
          title: 'Como funciona?',
          description: 'Para fazer essa estratégia funcionar e alcançar o dano máximo logo no Turno 1, você precisa jogar no formato de Batalhas em Dupla ou Trio.\n\n\u00a0\n\nO objetivo é fazer o seu Pokémon mais rápido atacar o seu próprio aliado com o golpe Beat Up (Surra). Esse golpe ataca uma vez para cada Pokémon saudável no seu time. Como cada golpe conta como um ataque separado do tipo Sombrio, ele vai ativar a habilidade Justified quatro vezes seguidas (se você tiver 4 Pokémon inteiros na equipe), colocando o Attack do seu aliado no nível máximo (+4 ou 3x mais dano) instantaneamente.\n\n\u00a0\n\nAbaixo vou ensinar como montar o combo perfeito',            
        },
        {
          title: 'O Ativador (Pokémon Rápido)',
          description: 'Você precisa de um Pokémon que seja extremamente rápido e que aprenda Beat Up, de preferência com um status de Attack baixo para não machucar muito o seu próprio aliado.\n- Whimsicott: é a melhor escolha. Ele tem a habilidade Prankster, que faz o golpe Beat Up ter prioridade (+1) e atacar antes de qualquer oponente.\n- Weavile ou Dugtrio de Alola: também funcionam por causa da velocidade natural altíssima deles.',
        },        
        {
          title: 'O Atacante (O Usuário de Justified)',
          description: '- **Terrakion** ou **Lucario**.\n- Item recomendado: Life Orb (aumenta o dano em mais 1.3x) ou Weakness Policy (se o ativador causar um dano super efetivo de leve, aumenta ainda mais o Attack e Special Attack).',
        }
      ]
    },
    {
      stepTitle: 'Explicação Prática',
      steps:[
        {
          title: 'O Passo a Passo no Turno 1',
          description: '1 - Abertura: Você entra em campo com Whimsicott e Terrakion lado a lado.\n\n\u00a0\n\n2 - O Ataque Aliado: Whimsicott usa Beat Up focado no seu próprio Terrakion.\n\n\u00a0\n\n3 - A Ativação: O golpe vai acertar Terrakion 4 vezes, causando um dano mínimo (já que o ataque do Whimsicott é fraco). A cada hit, a habilidade Justified é ativada.\n\n\u00a0\n\n4 - Resultado: O Attack de Terrakion sobe para +4 estágios em menos de dois segundos.\n\n\u00a0\n\n5 - A Destruição: No mesmo turno, Terrakion (que também é muito rápido) usa um golpe em área como Rock Slide (Deslizamento de Rocha). Com o bônus de 3x de dano, ele tem grandes chances de nocautear os dois Pokémon adversários de uma só vez.'
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
          description: 'Sua única função é ser o mais rápido possível para ativar o Terrakion e dar suporte ao time.\n- Habilidade: Prankster (Garante prioridade +1 para golpes de status, como Taunt e Tailwind).\n- Item: Focus Sash (Garante que ele sobreviva com 1 de vida a qualquer ataque forte no Turno 1).\n- Nature (Natureza): Timid (+Velocidade, -Ataque Físico. Isso é vital para o Beat Up causar o menor dano possível no seu Terrakion).\n- Distribuição de EVs: 4 HP / 252 Special Attack / 252 Speed.\n\n\u00a0\n\nAtaques (Moveset):\n- Beat Up: O golpe do combo. Deve ser usado no Terrakion no Turno 1.\n- Tailwind: Dobra a velocidade do seu time por 4 turnos. Use se o time adversário também for muito rápido.\n- Taunt: Impede o oponente de usar golpes de status (como Trick Room ou Follow Me que estragariam sua estratégia).\n- Moonblast: Para o Whimsicott não ficar totalmente sem dano caso precise atacar no fim do jogo.'
        },
        {
          title: 'O Atacante: Terrakion',
          description: 'O monstro que vai receber o bônus e varrer o campo adversário.\n- Habilidade: Justified (Ganha +1 de Ataque para cada hit do Beat Up).\n- Item: Life Orb (Aumenta todo o dano dele em mais 1.3x) ou Lum Berry (Para evitar que o oponente o congele, durma ou queime).\n- Nature (Natureza): Jolly (+Velocidade, -Ataque Especial. Garante que ele ataque antes da maioria dos inimigos após o combo).\n- Distribuição de EVs: 4 HP / 252 Attack / 252 Speed.\n\n\u00a0\n\nAtaques (Moveset):\n- Rock Slide: Golpe principal. Causa dano massivo nos dois oponentes ao mesmo tempo e tem 30% de chance de fazê-los hesitar (flinch).\n- Close Combat: Golpe devastador do tipo Lutador focado em um único alvo para derrubar Pokémon extremamente defensivos.\n- Protect: Essencial em duplas. Use para se proteger caso preveja um ataque duplo focado no Terrakion.\n- Iron Head ou Poison Jab: Golpe de cobertura para lidar com Pokémon do tipo Fada que ameaçam o Terrakion.'
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
    },
    {
      stepTitle: 'Outros dois Pokémon precisam cobrir as fraquezas de Whimsicott e Terrakion',
      steps: [
        {
          description: 'Para fechar esse time e proteger a sua estratégia, os outros dois Pokémon precisam cobrir as fraquezas de Whimsicott e Terrakion, além de oferecer um plano alternativo caso o oponente consiga parar o combo do Beat Up. \n\n\u00a0\n\nOs dois melhores parceiros para essa equipe são esses abaixo'
        },
        {
          title: 'O Guarda-Costas: Incineroar',
          description: 'Incineroar é considerado o rei do formato de Duplas por causa da sua utilidade absurda. Ele entra em campo para enfraquecer os oponentes e garantir que o Terrakion ataque em segurança.\n- Habilidade: Intimidate (Reduz o Attack de ambos os oponentes assim que entra em campo).\n- Item: Figy Berry ou Assault Vest (Para aumentar muito a sua durabilidade).\n- Nature (Natureza): Careful (+Special Defense, -Special Attack).\n- Distribuição de EVs: 244 HP / 84 Defense / 180 Special Defense (Uma build bem defensiva).\n\n\u00a0\n\nAtaques (Moveset):\n- Fake Out: Golpe prioritário que faz um oponente hesitar (flinch) no primeiro turno. Perfeito para travar uma ameaça ao Terrakion.\n- U-turn ou Parting Shot: Permite causar dano (ou reduzir atributos do rival) e voltar para o banco, permitindo reativar o Intimidate mais tarde.\n- Flare Blitz: Golpe de fogo fortíssimo para derreter Pokémon do tipo Aço ou Grama.\n- Knock Off: Remove o item do oponente e causa bom dano do tipo Sombrio.'
        },
        {
          title: 'O Atacante Especial e Controle: Gastrodon',
          description: 'Terrakion sofre muito contra ataques do tipo Água (como Water Spout de Kyogre ou Scald). Gastrodon entra no time como o counter perfeito para isso, além de trazer poder ofensivo pelo lado Especial.\n- Habilidade: Storm Drain (Atrai todos os golpes do tipo Água do campo para si. Além de ficar imune a eles, Gastrodon ganha +1 de Special Attack toda vez que absorve um golpe de água).\n- Item: Leftovers (Recupera vida passivamente).\n- Nature (Natureza): Modest (+Special Attack, -Ataque Físico).\n- Distribuição de EVs: 252 HP / 124 Defense / 132 Special Attack.\n\n\u00a0\n\nAtaques (Moveset):\n- Scald: Golpe de Água confiável com 30% de chance de queimar o oponente (reduzindo o ataque físico dele pela metade).\n- Earth Power: Golpe forte do tipo Terra para cobertura contra Pokémon de Aço, Fogo e Veneno.\n- Recover: Recupera 50% da vida máxima instantaneamente, tornando Gastrodon muito difícil de nocautear.\n- Ice Beam ou Protect: Ice Beam ajuda a derrubar Pokémon do tipo Dragão e Voadores (como Salamence e Landorus).'
        }
      ]
    },
    {
      stepTitle: 'Como a equipe joga junta',
      steps: [ 
        {
          description: '- Estratégia Principal: Whimsicott + Terrakion na frente para tentar o nocaute rápido com Beat Up + Rock Slide.\n- Plano de Fundo: Se o oponente tiver golpes de Água perigosos, você deixa Gastrodon no banco. No momento em que o rival tentar surfar ou atacar o Terrakion com água, você substitui o Whimsicott pelo Gastrodon, anulando o ataque inimigo e bufando o seu sapo de graça.\n- Controle de Campo: Incineroar entra para travar inimigos perigosos com Fake Out e resetar o clima ou habilidades defensivas deles.'
        } 
      ]
    }
  ],
  tips: [],
  images: [],
}
