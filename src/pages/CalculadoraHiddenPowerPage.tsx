import { useState } from "react";
import "./CalculadoraHiddenPowerPage.css";

const TYPES = [
  "Lutador",
  "Voador",
  "Veneno",
  "Terra",
  "Pedra",
  "Inseto",
  "Fantasma",
  "Aço",
  "Fogo",
  "Água",
  "Grama",
  "Elétrico",
  "Psíquico",
  "Gelo",
  "Dragão",
  "Sombrio",
] as const;

interface IVs {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

const IV_FIELDS: { label: string; key: keyof IVs }[] = [
  { label: "HP", key: "hp" },
  { label: "ATK", key: "atk" },
  { label: "DEF", key: "def" },
  { label: "SATK", key: "spa" },
  { label: "SDEF", key: "spd" },
  { label: "SPD", key: "spe" },
];

function hiddenPowerType(ivs: IVs): typeof TYPES[number] {
  const bits =
    (ivs.hp & 1) +
    2 * (ivs.atk & 1) +
    4 * (ivs.def & 1) +
    8 * (ivs.spe & 1) +
    16 * (ivs.spa & 1) +
    32 * (ivs.spd & 1);

  const index = Math.floor((bits * 15) / 63);

  return TYPES[index];
}

function hiddenPowerBasePower(ivs: IVs): number {
  const bits =
    ((ivs.hp >> 1) & 1) +
    2 * ((ivs.atk >> 1) & 1) +
    4 * ((ivs.def >> 1) & 1) +
    8 * ((ivs.spe >> 1) & 1) +
    16 * ((ivs.spa >> 1) & 1) +
    32 * ((ivs.spd >> 1) & 1);

  return Math.floor((bits * 40) / 63) + 30;
}

function CalculadoraHiddenPower() {
  const [ivs, setIVs] = useState<IVs>({
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  });

  const [tipo, setTipo] = useState("");
  const [poder, setPoder] = useState<number | null>(null);

  const handleChange = (campo: keyof IVs, valor: string) => {
    const numero = Math.max(0, Math.min(31, Number(valor) || 0));

    setIVs((prev) => ({
      ...prev,
      [campo]: numero,
    }));
  };

  const calcular = () => {
    setTipo(hiddenPowerType(ivs));
    setPoder(hiddenPowerBasePower(ivs));
  };

  return (
    <section className="calculadora-hidden-power-page">
      <div className="page-header">
        <p className="eyebrow">Calculadora</p>
        <h2>Calculadora de Hidden Power</h2>
        <p className="page-description">
          Esta ferramenta calculará o tipo e o poder base do Hidden Power
          considerando os IVs do Pokémon.
        </p>
      </div>

      <div className="live-card">
        <fieldset className="admin-ivs-fieldset">
          <legend>IVs</legend>

          <div className="admin-ivs-row">
            {IV_FIELDS.map(({ label, key }) => (
              <label key={key} className="admin-ivs-item">
                <span>{label}</span>

                <input
                  type="number"
                  min={0}
                  max={31}
                  value={ivs[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </label>
            ))}
          </div>

          <div className="admin-note">
            HP / ATK / DEF / SATK / SDEF / SPD
          </div>
        </fieldset>

        <br />

        <button
          type="button"
          className="primary-btn"
          onClick={calcular}
        >
          Calcular
        </button>

        {tipo && (
          <div
            style={{
              marginTop: 20,
              textAlign: "center",
              fontSize: "18px",
            }}
          >
            <p>
              <strong>Tipo:</strong> {tipo}
            </p>

            <p>
              <strong>Poder Base:</strong> {poder}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default CalculadoraHiddenPower;