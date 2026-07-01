import { IV_LABELS, mergeIvsParts, NATURES, SHINY_OPTIONS, STATUS_OPTIONS } from '../constants/sales'
import type { SaleFormValues } from '../types'
import './AdminSaleForm.css'

interface AdminSaleFormProps {
  formData: SaleFormValues
  isEditing: boolean
  onChange: (field: keyof SaleFormValues, value: string | number | boolean) => void
  onSubmit: () => Promise<void>
  onCancel: () => void
}

function AdminSaleForm({ formData, isEditing, onChange, onSubmit, onCancel }: AdminSaleFormProps) {
  const ivParts = formData.ivs ? formData.ivs.split('/') : IV_LABELS.map(() => '0')

  return (
    <div className="admin-sale-form">
      <label className="admin-field">
        <span>Pokemon</span>
        <input
          placeholder="Nome do Pokémon"
          value={formData.pokemon}
          onChange={(event) => onChange('pokemon', event.target.value)}
        />
      </label>

      <label className="admin-field">
        <span>Level</span>
        <input
          type="number"
          placeholder="Ex: 72"
          value={formData.level}
          onChange={(event) => onChange('level', Number(event.target.value))}
        />
      </label>

      <label className="admin-field">
        <span>Ability</span>
        <input
          placeholder="Habilidade"
          value={formData.ability}
          onChange={(event) => onChange('ability', event.target.value)}
        />
      </label>

      <label className="admin-field">
        <span>Nature</span>
        <select value={formData.nature} onChange={(event) => onChange('nature', event.target.value)}>
          <option value="">-- Selecione a Nature --</option>
          {NATURES.map((nature) => (
            <option key={nature} value={nature}>
              {nature}
            </option>
          ))}
        </select>
      </label>

      <fieldset className="admin-ivs-fieldset">
        <legend>IVs</legend>
        <div className="admin-ivs-row">
          {IV_LABELS.map((label, index) => (
            <label key={label} className="admin-ivs-item">
              <span>{label}</span>
              <input
                type="number"
                min="0"
                max="31"
                placeholder="0"
                value={ivParts[index] ?? '0'}
                onChange={(event) => {
                  const next = [...ivParts]
                  next[index] = event.target.value
                  onChange('ivs', mergeIvsParts(next))
                }}
              />
            </label>
          ))}
        </div>
        <div className="admin-note">Será salvo como HP/ATK/DEF/SATK/SDEF/SPD</div>
      </fieldset>

      <label className="admin-field">
        <span>Shiny</span>
        <select value={formData.shiny ? 'Sim' : 'Não'} onChange={(event) => onChange('shiny', event.target.value === 'Sim')}>
          {SHINY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="admin-field">
        <span>Preço</span>
        <input
          type="number"
          placeholder="Ex: 450"
          value={formData.price}
          onChange={(event) => onChange('price', Number(event.target.value))}
        />
      </label>

      <label className="admin-field">
        <span>Status</span>
        <select value={formData.status} onChange={(event) => onChange('status', event.target.value)}>
          <option value="">-- Selecione o Status --</option>
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="admin-actions">
        {isEditing ? (
          <>
            <button type="button" className="primary-btn" onClick={onSubmit}>
              Salvar edição
            </button>
            <button type="button" className="secondary-btn" onClick={onCancel}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button type="button" className="primary-btn" onClick={onSubmit}>
              Salvar
            </button>
            <button type="button" className="secondary-btn" onClick={onCancel}>
              Cancelar
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminSaleForm
