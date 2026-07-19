import type { ExpandedGuide } from './expanded-guide'

export const habilidadesComEfeitosSecretosForaBatalhaGuide: ExpandedGuide = {
  slug: 'habilidades-com-efeitos-secretos-fora-batalha',
  title: 'Habilidades com efeitos secretos',
  subtitle: 'Habilidades com efeitos secretos fora da batalha',
  description:
    'Nesse guia você irá aprender sobre algumas habilidades com efeitos secretos(Field Effects) fora do campo de batalha, válidas no PokeOne.',
  summary: '',
  image: '',
  topics: [],
  steps: [
    {
        stepTitle: 'Relacionadas ao encontro de Pokémon selvagens',
        steps: [
            {
                title: 'Aumentam a taxa de encontro',
                description: `- **Arena Trap**: dobra a chance de encontrar Pokémon selvagens. Ex.: Diglett, Dugtrio, e Trapinch.
                \n- **Illuminate**: dobra a chance de encontrar Pokémon selvagens. Ex.: Starmie, Lanturn, Volbeat, e Watchog.
                \n- **No Guard**: aumenta a taxa de encontro em 1,5x. Ex.: Machamp, e Doublade.`,
            },        
            {
            title: 'Diminuem a taxa de encontro',
            description: `- **Stench**: reduz pela metade a chance de aparecer um Pokémon selvagem. Ex.: Muk de Alola, Garbodor, Skuntank, e Gloom.
                \n- **White Smoke**: reduz pela metade a chance de aparecer um Pokémon selvagem. Ex.: Torkoal, e Heatmor (h.a.).
                \n- **Quick Feet**: reduz pela metade a chance de aparecer um Pokémon selvagem. Ex.: Jolteon, Linoone, Shroomish, e Scolipede.
                \n- **Intimidate**: reduz a chance de encontro se o Pokémon líder tiver nível maior que os selvagens da área. Ex.: Gyarados, Granbull, Hitmontop, Mightyena, Masquerain, Mawile, Salamence, Staraptor, Luxray, Stoutland, Krookodile, Qwilfish (h.a.), e Scrafty (h.a.).
                \n- **Sand Veil**: reduz pela metade a taxa de encontro em áreas com tempestade de areia. Ex.: Sandslash, Dugtrio, Gliscor, Cacturne, Garchomp, e Heliolisk`,
            },
            {
                title: 'Aumentam encontros de alto nível',
                description: `- **Hustle**: aumenta a chance de encontrar Pokémon selvagens de nível mais alto. Ex.: Corsola, Delibird, Togekiss, Darumaka, Durant, Zweilous, Raticate de Alola (h.a.), Nidorino/Nidorina (h.a.), Combee, e Rufflet.
                \n- **Pressure**: aumenta a chance de encontrar Pokémon selvagens de nível mais alto. Ex.: Aerodactyl, Articuno, Moltres, Mewtwo, Entei, Suicune, Ho-Oh, Absol, Vespiquen, Spiritomb, Dusknoir, Dialga, Giratina, Kyurem, Bisharp (h.a.), Zapdos, Raikou, Lugia, Deoxys, Weavile, Palkia, e Wailord (h.a.).
                \n- **Vital Spirit**: aumenta a chance de encontrar Pokémon selvagens de nível mais alto. Ex.: Primeape, Elekid, e Buneary/Lopunny.`,
            }
        ]
    },
    {
        stepTitle: 'Relacionadas ao tipo/atributos do Pokémon encontrado',
        steps: [
            {
                title: 'Relacionadas ao tipo',
                description: `- **Magnet Pull**: aumenta a chance de encontrar Pokémon selvagens do tipo Aço. Ex.: Magneton, Magnezone, e Probopass.
                \n- **Static**:  aumenta a chance de encontrar Pokémon selvagens do tipo Elétrico. Ex.: Raichu, Electrode, Electabuzz, Ampharos, Manectric, Emolga, e Stunfisk.`
            },
            {
                title: 'Relacionadas ao gênero',
                description: `- **Cute Charm**: aumenta a chance de encontrar um Pokémon selvagem do gênero oposto. Ex.: Jigglypuff, Clefairy, Marill/Azumarill, e Skitty.`,
            },
            {
                title: 'Relacionados a ability',
                description: `- **Compoundeyes**: aumenta a chance de o Pokémon selvagem encontrado estar segurando um item. Ex.: Butterfree, Venonat, Yanma, Nincada, Galvantula, Vivillon, e Scatterbug.`,
            },
            {
                title: 'Relacionadas a natureza',
                description: `- **Synchronize**: aumenta em 50% a chance de o Pokémon selvagem encontrado ter a mesma Natureza do líder. Ex.: Alakazam, Mew, Xatu, Espeon, Umbreon, Gardevoir, Musharna, Beheeyem, e Sylveon.`,
            },
        ]
    },
    {
        stepTitle: 'Relacionadas à pesca/ovos/itens',
        steps: [
            {
                title: 'À pesca',
                description: `- **Suction Cups**: aumentam a chance de fisgar algo ao pescar. Ex.: Octillery, Cradily, e Malamar.
                \n- **Sticky Hold**: aumentam a chance de fisgar algo ao pescar. Ex.: Muk, Swalot, Gastrodon, Trubbish, e Accelgor.`
            },
            {
                title: 'À ovos',
                description: `- **Flame Body**: reduz pela metade o número de passos necessários para chocar um ovo. Ex.: Magmortar, Chandelure, Volcarona, Talonflame, Rapidash (h.a.), e Moltres (h.a.).
                \n- **Magma Armor**: reduz pela metade o número de passos necessários para chocar um ovo. Ex.: Magcargo, e Camerupt.`,
            },
            {
                title: 'À itens',
                description: `- **Honey Gather**: chance de obter o item Honey após uma batalha, se o Pokémon não estiver segurando nada. Ex.: Teddiursa, Combee, e Ribombee.
                \n- **Pickup**: chance de encontrar um item aleatório após a batalha, se o Pokémon não estiver segurando nada. Ex.: Meowth, Zigzagoon/Linoone, Aipom, Teddiursa, Phanpy, Bidoof, e Buizel.`,
            },
        ]
    },
    {
        stepTitle: 'Observações Importantes',
        steps: [
            {
                title: 'Slots de efeitos',
                description: 'Os efeitos só funcionam quando o Pokémon com a habilidade está no primeiro slot da equipe (exceto Flame Body/Magma Armor e Honey Gather/Pickup, que funcionam em qualquer posição da equipe/individualmente). Além disso, itens como Cleanse Tag, Pure Incense, flautas e Repelentes podem anular ou sobrepor esses efeitos.',
            },
            {
                title: 'PokeOne',
                description: 'No PokeOne não funcinam habilidade relacionadas a Itens como "Honey Gather" e "Pickup".',
            }
        ]
    }
  ],
  tips: [],
  images: [],
}
