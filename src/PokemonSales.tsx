import { useEffect, useMemo, useState } from 'react'
import { query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore'
import SalesDataGrid from './components/SalesDataGrid'
import type { SaleRecord } from './types'
import { salesCollectionRef, getSaleRowsFromSnapshot, seedRowData, formatPrice } from './constants/sales'
import './components/PokemonSales.css'
import 'react-data-grid/lib/styles.css'

function PokemonSales() {
  const [rowData, setRowData] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const seedSales = async () => {
    setLoading(true)
    setError(null)

    try {
      await Promise.all(
        seedRowData.map((sale) => addDoc(salesCollectionRef, { ...sale, createdAt: serverTimestamp() }))
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
    setLoading(true)
    setError(null)

    try {
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
    void fetchSales()
  }, [])

  const columns = useMemo(
    () => [
      { key: 'pokemon', name: 'Pokemon', sortable: true, resizable: true },
      { key: 'level', name: 'Level', sortable: true, resizable: true, width: 110 },
      { key: 'ability', name: 'Ability', sortable: true, resizable: true },
      { key: 'nature', name: 'Nature', sortable: true, resizable: true },
      { key: 'ivs', name: "IV's", sortable: true, resizable: true },
      {
        key: 'shiny',
        name: 'Shiny',
        sortable: true,
        resizable: true,
        width: 100,
        renderCell: ({ row }: { row: SaleRecord }) => <>{row.shiny ? 'Sim' : 'Não'}</>,
      },
      {
        key: 'price',
        name: 'P. Dollars',
        sortable: true,
        resizable: true,
        width: 140,
        renderCell: ({ row }: { row: SaleRecord }) => <>{formatPrice(row.price)}</>,
      },
      { key: 'status', name: 'Status atual', sortable: true, resizable: true, width: 150 },
    ],
    []
  )

  const rowKeyGetter = (row: SaleRecord) => row.id ?? ''

  const rowClass = (row: SaleRecord) => {
    const status = String(row.status || '').toLowerCase()
    const classes = []
    if (row.shiny) classes.push('shiny-row')
    if (status === 'vendido') classes.push('sold-row')
    if (status === 'reservado') classes.push('reserved-row')
    return classes.join(' ') || undefined
  }

  return (
    <section className="sales-page">
      <div className="sales-header">
        <div>
          <p className="eyebrow">VENDAS DE POKÉMONS</p>
          <h2>Minhas vendas de Pokémons listadas com React Data Grid</h2>
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
      <div className="sales-grid" style={{ padding: '1em' }}>
        <SalesDataGrid
          rows={rowData}
          columns={columns}
          rowKeyGetter={rowKeyGetter}
          rowClass={rowClass}
        />
      </div>
    </section>
  )
}

export default PokemonSales
