import { useMemo, useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { ModuleRegistry, ClientSideRowModelModule, RowStyleModule, NumberFilterModule, TextFilterModule, TooltipModule } from 'ag-grid-community'
import { collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import type { ColDef } from 'ag-grid-community'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { db } from './firebase'

ModuleRegistry.registerModules([ClientSideRowModelModule, RowStyleModule, NumberFilterModule, TextFilterModule, TooltipModule])

interface SaleRecord {
  id?: string
  pokemon: string
  level: number
  ability: string
  nature: string
  ivs: string
  quantity: number
  shiny: boolean
  price: number
  status: string
}

const seedRowData: SaleRecord[] = [
  {
    pokemon: 'Charizard',
    level: 72,
    ability: 'Blaze',
    nature: 'Timid',
    ivs: '31/30/31/31/31/29',
    quantity: 1,
    shiny: false,
    price: 450,
    status: 'Disponível',
  },
  {
    pokemon: 'Gengar',
    level: 65,
    ability: 'Levitate',
    nature: 'Timid',
    ivs: '31/31/30/31/31/31',
    quantity: 2,
    shiny: true,
    price: 380,
    status: 'Vendido',
  },
  {
    pokemon: 'Gardevoir',
    level: 70,
    ability: 'Trace',
    nature: 'Modest',
    ivs: '31/31/31/30/31/31',
    quantity: 1,
    shiny: false,
    price: 500,
    status: 'Reservado',
  },
  {
    pokemon: 'Gardevoir',
    level: 70,
    ability: 'Trace',
    nature: 'Modest',
    ivs: '31/31/31/30/31/31',
    quantity: 1,
    shiny: true,
    price: 500,
    status: 'Disponível',
  },
]

const salesCollectionName = 'pokemonSales'
const salesCollectionRef = collection(db, salesCollectionName)

const getSaleRowsFromSnapshot = (docs: any[]) =>
  docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SaleRecord[]

function PokemonSales() {
  const [rowData, setRowData] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const seedSales = async () => {
    try {
      setLoading(true)
      await Promise.all(
        seedRowData.map((sale) =>
          addDoc(salesCollectionRef, { ...sale, createdAt: serverTimestamp() })
        )
      )
      const seededSnapshot = await getDocs(query(salesCollectionRef, orderBy('createdAt')))
      setRowData(getSaleRowsFromSnapshot(seededSnapshot.docs))
    } catch (err) {
      setError('Falha ao criar os registros no Firestore.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchSales = async () => {
    try {
      setLoading(true)
      setError(null)
      const salesQuery = query(salesCollectionRef, orderBy('createdAt'))
      const snapshot = await getDocs(salesQuery)

      if (snapshot.empty) {
        await seedSales()
        return
      }

      setRowData(getSaleRowsFromSnapshot(snapshot.docs))
    } catch (err) {
      setError('Falha ao carregar as vendas do Firestore.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSales()
  }, [])

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { field: 'pokemon', headerName: 'Pokemon', flex: 1, sortable: true, filter: true },
      { field: 'level', headerName: 'Level', width: 110, sortable: true, filter: 'agNumberColumnFilter' },
      { field: 'ability', headerName: 'Ability', flex: 1, sortable: true, filter: true },
      { field: 'nature', headerName: 'Nature', flex: 1, sortable: true, filter: true },
      {
        field: 'ivs',
        headerName: "IV's",
        flex: 1,
        sortable: true,
        filter: true,
        headerTooltip: 'HP/ATK/DEF/SATK/SDEF/SPD',
        tooltipValueGetter: () => 'HP/ATK/DEF/SATK/SDEF/SPD',
      },
      { field: 'quantity', headerName: 'Quantidade', width: 130, sortable: true, filter: 'agNumberColumnFilter' },
      { field: 'shiny', headerName: 'Shiny', width: 100, sortable: true, filter: true, valueFormatter: ({ value }) => (value ? 'Sim' : 'Não') },
      {
        field: 'price',
        headerName: 'P. Dollars',
        width: 140,
        sortable: true,
        filter: 'agNumberColumnFilter',
        valueFormatter: ({ value }) => {
          if (typeof value !== 'number') {
            return value
          }

          if (value >= 1000) {
            return `$ ${Math.round(value / 1000)}k`
          }

          return `$ ${value}`
        },
      },
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
      {error ? (
        <div className="sales-error">
          <p>{error}</p>
          <button type="button" onClick={fetchSales} className="primary-btn">
            Tentar carregar novamente
          </button>
        </div>
      ) : null}
      {loading ? <p>Carregando vendas...</p> : <p className="sales-note">IV's = HP/ATK/DEF/SATK/SDEF/SPD</p>}
      <div className="ag-theme-alpine sales-grid">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          enableBrowserTooltips={true}
          tooltipShowDelay={0}
          rowClassRules={{
            'shiny-row': (params) => params.data?.shiny === true,
            'sold-row': (params) => params.data?.status?.toLowerCase() === 'vendido',
            'reserved-row': (params) => params.data?.status?.toLowerCase() === 'reservado',
          }}
        />
      </div>
    </section>
  )
}

export default PokemonSales
