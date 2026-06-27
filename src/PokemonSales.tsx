import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

interface SaleRecord {
  pokemon: string
  level: number
  ability: string
  nature: string
  ivs: string
  price: string
  status: string
}

const defaultRowData: SaleRecord[] = [
  {
    pokemon: 'Charizard',
    level: 72,
    ability: 'Blaze',
    nature: 'Timid',
    ivs: '31/30/31/31/31/29',
    price: 'R$ 450,00',
    status: 'Disponível',
  },
  {
    pokemon: 'Gengar',
    level: 65,
    ability: 'Levitate',
    nature: 'Timid',
    ivs: '31/31/30/31/31/31',
    price: 'R$ 380,00',
    status: 'Vendido',
  },
  {
    pokemon: 'Gardevoir',
    level: 70,
    ability: 'Trace',
    nature: 'Modest',
    ivs: '31/31/31/30/31/31',
    price: 'R$ 500,00',
    status: 'Reservado',
  },
]

function PokemonSales() {
  const [rowData] = useState(defaultRowData)

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'pokemon', headerName: 'Pokemon', flex: 1, sortable: true, filter: true },
      { field: 'level', headerName: 'Level', width: 110, sortable: true, filter: 'agNumberColumnFilter' },
      { field: 'ability', headerName: 'Ability', flex: 1, sortable: true, filter: true },
      { field: 'nature', headerName: 'Nature', flex: 1, sortable: true, filter: true },
      { field: 'ivs', headerName: "IV's", flex: 1, sortable: true, filter: true },
      { field: 'price', headerName: 'Preço', width: 140, sortable: true, filter: true },
      { field: 'status', headerName: 'Status atual', width: 150, sortable: true, filter: true },
    ],
    []
  )

  return (
    <section className="sales-page">
      <div className="sales-header">
        <div>
          <p className="eyebrow">VENDAS DE POKÉMONS</p>
          <h2>Minhas vendas de Pokémons listadas com AG Grid</h2>
        </div>
      </div>
      <div className="ag-theme-alpine sales-grid">
        <AgGridReact rowData={rowData} columnDefs={columnDefs} domLayout="autoHeight" />
      </div>
    </section>
  )
}

export default PokemonSales
