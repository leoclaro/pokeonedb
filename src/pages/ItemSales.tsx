import { useEffect, useMemo, useState } from 'react'
import { query, orderBy, getDocs } from 'firebase/firestore'
import SalesDataGrid from '../components/SalesDataGrid'
import type { ItemRecord } from '../types'
import { itemSalesCollectionRef, getItemRowsFromSnapshot, formatPrice } from '../constants/sales'
import './ItemSales.css'
import 'react-data-grid/lib/styles.css'

function ItemSales() {
  const [rowData, setRowData] = useState<ItemRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSales = async () => {
    setLoading(true)
    setError(null)

    try {
      const salesQuery = query(itemSalesCollectionRef, orderBy('createdAt'))
      const snapshot = await getDocs(salesQuery)
      setRowData(getItemRowsFromSnapshot(snapshot.docs))
    } catch (err) {
      setError('Falha ao carregar os itens do Firestore.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchSales()
  }, [])

  const getItemSpriteUrl = (name: string) => {
    const normalized = name
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')

    return `https://img.pokemondb.net/sprites/items/${normalized}.png`
  }

  const columns = useMemo(
    () => [
      {
        key: 'name',
        name: 'Nome',
        sortable: true,
        resizable: true,
        renderCell: ({ row }: { row: ItemRecord }) => (
          <div className="item-cell">
            <img
              src={getItemSpriteUrl(row.name)}
              alt={row.name}
              className="item-cell-image"
              onError={(event) => {
                event.currentTarget.style.visibility = 'hidden'
              }}
            />
            <span>{row.name}</span>
          </div>
        ),
      },
      { key: 'category', name: 'Categoria', sortable: true, resizable: true },
      { key: 'status', name: 'Status', sortable: true, resizable: true, width: 130 },
      {
        key: 'price',
        name: 'P. Dollars',
        sortable: true,
        resizable: true,
        width: 130,
        renderCell: ({ row }: { row: ItemRecord }) => <>{formatPrice(row.price)}</>,
      },
      { key: 'createdAt', name: 'Criado em', sortable: true, resizable: true, width: 180 },
    ],
    []
  )

  const rowKeyGetter = (row: ItemRecord) => row.id ?? ''

  return (
    <section className="sales-page">
      <div className="sales-header">
        <div>
          <p className="eyebrow">VENDAS DE ITENS</p>
          <h2>Confira os itens à venda na loja</h2>
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

      {loading ? <p>Carregando itens...</p> : <p className="sales-note">Exibe itens cadastrados na coleção itemSales.</p>}

      <div className="sales-grid" style={{ padding: '1em' }}>
        <SalesDataGrid rows={rowData} columns={columns} rowKeyGetter={rowKeyGetter} />
      </div>
    </section>
  )
}

export default ItemSales
