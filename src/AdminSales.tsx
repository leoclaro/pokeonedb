import { useEffect, useMemo, useState, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  RowStyleModule,
  RowSelectionModule,
  NumberFilterModule,
  TextFilterModule,
  TooltipModule,
} from 'ag-grid-community'
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore'
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  type User,
} from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import type { CellValueChangedEvent, ColDef } from 'ag-grid-community'
import { db, auth, googleProvider } from './firebase'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowStyleModule,
  RowSelectionModule,
  NumberFilterModule,
  TextFilterModule,
  TooltipModule,
])

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

const salesCollectionName = 'pokemonSales'
const salesCollectionRef = collection(db, salesCollectionName)

const getSaleRowsFromSnapshot = (docs: any[]) =>
  docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SaleRecord[]

const parseEditableValue = (field: string, value: any) => {
  if (field === 'level' || field === 'quantity' || field === 'price') {
    return Number(value)
  }

  if (field === 'shiny') {
    if (typeof value === 'boolean') return value
    const text = String(value).toLowerCase().trim()
    return text === 'sim' || text === 'true' || text === '1'
  }

  return value
}

function AdminSales() {
  const [user, setUser] = useState<User | null>(null)
  const [rowData, setRowData] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const gridApiRef = useRef<any>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRow, setNewRow] = useState<Omit<SaleRecord, 'id'>>({
    pokemon: '',
    level: 1,
    ability: '',
    nature: '',
    ivs: '31/31/31/31/31/31',
    quantity: 1,
    shiny: false,
    price: 0,
    status: 'Disponível',
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return unsubscribe
  }, [])

  const fetchSales = async () => {
    setLoading(true)
    setError(null)

    try {
      const salesQuery = query(salesCollectionRef, orderBy('createdAt'))
      const snapshot = await getDocs(salesQuery)
      setRowData(getSaleRowsFromSnapshot(snapshot.docs))
    } catch (err) {
      console.error(err)
      setError('Falha ao carregar as vendas do Firestore.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchSales()
    } else {
      setRowData([])
      setLoading(false)
    }
  }, [user])

  const handleSignIn = async () => {
    setError(null)
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      console.error(err)

      if (err instanceof FirebaseError) {
        if (
          err.code === 'auth/popup-blocked-by-browser' ||
          err.code === 'auth/operation-not-supported-in-this-environment'
        ) {
          await signInWithRedirect(auth, googleProvider)
          return
        }

        const message =
          err.code === 'auth/unauthorized-domain'
            ? 'Falha ao autenticar: domínio não autorizado. Adicione localhost ou 127.0.0.1 em Firebase Auth -> Domínios autorizados.'
            : err.code === 'auth/configuration-not-found'
            ? 'Falha ao autenticar: configuração do Google não encontrada. Verifique se o login Google está habilitado no Firebase Auth.'
            : `Falha ao autenticar com Google: ${err.code}`
        setError(message)
        return
      }

      setError('Falha ao autenticar com Google.')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
      setError('Falha ao sair.')
    }
  }

  const handleAddNew = async () => {
    setShowAddForm(true)
  }

  const submitAddNew = async () => {
    setError(null)
    try {
      await addDoc(collection(db, salesCollectionName), {
        ...newRow,
        createdAt: serverTimestamp(),
      })

      setShowAddForm(false)
      setNewRow({
        pokemon: '',
        level: 1,
        ability: '',
        nature: '',
        ivs: '31/31/31/31/31/31',
        quantity: 1,
        shiny: false,
        price: 0,
        status: 'Disponível',
      })

      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao adicionar nova venda.')
    }
  }

  const cancelAddNew = () => {
    setShowAddForm(false)
  }

  const [editingRow, setEditingRow] = useState<SaleRecord | null>(null)

  const handleEditSelected = () => {
    setError(null)
    const api = gridApiRef.current
    if (!api) return
    const selectedRows = api.getSelectedRows() || []
    if (selectedRows.length === 0) {
      // se nada selecionado, abrir edição da primeira linha (comodidade para testes)
      if (rowData && rowData.length > 0) {
        setEditingRow(rowData[0])
        return
      }
      setError('Selecione uma linha para editar.')
      return
    }
    if (selectedRows.length > 1) {
      setError('Selecione apenas uma linha para editar.')
      return
    }

    setEditingRow(selectedRows[0])
  }
  
    const onEditingRowChange = (field: keyof SaleRecord, value: any) => {
      if (!editingRow) return
      setEditingRow({ ...editingRow, [field]: value } as SaleRecord)
    }

  const submitEdit = async () => {
    if (!editingRow?.id) return
    setError(null)
    try {
      const { id, ...data } = editingRow
      await updateDoc(doc(db, salesCollectionName, id), data)
      // update local state immediately so UI reflects change even if network hiccup
      setRowData((prev) => prev.map((r) => (r.id === id ? ({ id, ...data } as SaleRecord) : r)))
      setEditingRow(null)
      try {
        await fetchSales()
      } catch (e) {
        // fetch failure is non-fatal; UI already updated
        console.warn('fetch after edit failed', e)
      }
    } catch (err) {
      console.error(err)
      setError('Falha ao salvar edição.')
    }
  }

  const cancelEdit = () => {
    setEditingRow(null)
  }

  const handleDeleteSelected = async () => {
    setError(null)
    try {
      const api = gridApiRef.current
      if (!api) return
      const selectedRows = api.getSelectedRows() || []
      if (selectedRows.length === 0) {
        setError('Nenhuma linha selecionada para remoção.')
        return
      }

      await Promise.all(
        selectedRows.map((row: any) => {
          const id = row?.id
          if (!id) return Promise.resolve()
          return deleteDoc(doc(db, salesCollectionName, id))
        })
      )

      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao remover vendas selecionadas.')
    }
  }

  const handleCellValueChanged = async (params: CellValueChangedEvent<SaleRecord>) => {
    if (!params.data?.id) return

    const field = String(params.colDef.field)
    const value = parseEditableValue(field, params.newValue)

    try {
      await updateDoc(doc(db, salesCollectionName, params.data.id), {
        [field]: value,
      })
    } catch (err) {
      console.error(err)
      setError('Falha ao salvar alteração de venda.')
    }
  }

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { headerName: '', field: '__select', checkboxSelection: true, headerCheckboxSelection: true, width: 48, pinned: 'left' },
      { field: 'pokemon', headerName: 'Pokemon', flex: 1, sortable: true, filter: true },
      {
        field: 'level',
        headerName: 'Level',
        width: 110,
        sortable: true,
        filter: 'agNumberColumnFilter',
        
        valueParser: ({ newValue }) => Number(newValue),
      },
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
      {
        field: 'quantity',
        headerName: 'Quantidade',
        width: 130,
        sortable: true,
        filter: 'agNumberColumnFilter',
        
        valueParser: ({ newValue }) => Number(newValue),
      },
      {
        field: 'shiny',
        headerName: 'Shiny',
        width: 110,
        sortable: true,
        filter: true,
        
        valueFormatter: ({ value }) => (value ? 'Sim' : 'Não'),
        valueParser: ({ newValue }) => String(newValue).toLowerCase() === 'sim',
      },
      {
        field: 'price',
        headerName: 'P. Dollars',
        width: 140,
        sortable: true,
        filter: 'agNumberColumnFilter',
        
        valueFormatter: ({ value }) => {
          if (typeof value !== 'number') return value
          if (value >= 1000) return `$ ${Math.round(value / 1000)}k`
          return `$ ${value}`
        },
        valueParser: ({ newValue }) => Number(newValue),
      },
      { field: 'status', headerName: 'Status atual', width: 150, sortable: true, filter: true },
    ],
    []
  )

  return (
    <section className="sales-page admin-page">
      <div className="sales-header">
        <div>
          <p className="eyebrow">ADMIN DE VENDAS</p>
          <h2>Área oculta de edição de vendas</h2>
        </div>
      </div>

      {!user ? (
        <div className="admin-auth-panel">
          <p>Faça login com sua conta Google para editar as vendas de Pokémons.</p>
          <button type="button" className="primary-btn" onClick={handleSignIn}>
            Entrar com Google
          </button>
          <p className="admin-hint">A página é oculta. Use o caminho <code>#admin</code> para acessá-la.</p>
        </div>
      ) : (
        <div className="admin-user-panel">
          <p>
            Logado como <strong>{user?.email}</strong>
          </p>
          <button type="button" className="secondary-btn" onClick={handleSignOut}>
            Sair
          </button>
        </div>
      )}

      {error ? (
        <div className="sales-error">
          <p>{error}</p>
          <button type="button" className="primary-btn" onClick={fetchSales}>
            Tentar novamente
          </button>
        </div>
      ) : null}

      {user && (
        <>
          {editingRow && (
            <div className="edit-form">
              <h3>Editar venda</h3>
              <div>
                <label>Pokemon</label>
                <input value={editingRow.pokemon || ''} onChange={e => onEditingRowChange('pokemon', e.target.value)} />
              </div>
              <div>
                <label>Shiny</label>
                <select value={editingRow.shiny ? 'true' : 'false'} onChange={e => onEditingRowChange('shiny', e.target.value === 'true')}>
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
              <div>
                <label>Level</label>
                <input type="number" value={editingRow.level ?? 1} onChange={e => onEditingRowChange('level', Number(e.target.value))} />
              </div>
              <div>
                <label>Gender</label>
                <input value={editingRow.gender || ''} onChange={e => onEditingRowChange('gender', e.target.value)} />
              </div>
              <div>
                <label>Nature</label>
                <input value={editingRow.nature || ''} onChange={e => onEditingRowChange('nature', e.target.value)} />
              </div>
              <div>
                <label>Ability</label>
                <input value={editingRow.ability || ''} onChange={e => onEditingRowChange('ability', e.target.value)} />
              </div>
              <div>
                <label>IVs</label>
                <input value={editingRow.ivs || ''} onChange={e => onEditingRowChange('ivs', e.target.value)} />
              </div>
              <div>
                <label>Price</label>
                <input type="number" value={editingRow.price ?? 0} onChange={e => onEditingRowChange('price', Number(e.target.value))} />
              </div>
              <div style={{ marginTop: 8 }}>
                <button onClick={submitEdit}>Salvar edição</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </div>
            </div>
          )}
          {loading ? (
            <p>Carregando vendas para edição...</p>
          ) : (
            <div className="ag-theme-alpine sales-grid">
              <div className="admin-grid-actions" style={{ marginBottom: 8 }}>
                {!showAddForm ? (
                  <>
                    <button type="button" className="primary-btn" onClick={handleAddNew} style={{ marginRight: 8 }}>
                      Adicionar
                    </button>
                    <button type="button" className="secondary-btn" onClick={handleDeleteSelected}>
                      Remover selecionados
                    </button>
                    <button type="button" className="secondary-btn" onClick={handleEditSelected} style={{ marginLeft: 8 }}>
                      Editar selecionado
                    </button>
                  </>
                ) : (
                  <div className="add-form" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <input placeholder="Pokemon" value={newRow.pokemon} onChange={(e) => setNewRow({ ...newRow, pokemon: e.target.value })} />
                    <input type="number" placeholder="Level" value={newRow.level} onChange={(e) => setNewRow({ ...newRow, level: Number(e.target.value) })} />
                    <input placeholder="Ability" value={newRow.ability} onChange={(e) => setNewRow({ ...newRow, ability: e.target.value })} />
                    <input placeholder="Nature" value={newRow.nature} onChange={(e) => setNewRow({ ...newRow, nature: e.target.value })} />
                    <input placeholder="IVs (HP/ATK/DEF/SATK/SDEF/SPD)" value={newRow.ivs} onChange={(e) => setNewRow({ ...newRow, ivs: e.target.value })} />
                    <input type="number" placeholder="Quantidade" value={newRow.quantity} onChange={(e) => setNewRow({ ...newRow, quantity: Number(e.target.value) })} />
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <input type="checkbox" checked={!!newRow.shiny} onChange={(e) => setNewRow({ ...newRow, shiny: e.target.checked })} /> Shiny
                    </label>
                    <input type="number" placeholder="Preço" value={newRow.price} onChange={(e) => setNewRow({ ...newRow, price: Number(e.target.value) })} />
                    <input placeholder="Status" value={newRow.status} onChange={(e) => setNewRow({ ...newRow, status: e.target.value })} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button type="button" className="primary-btn" onClick={submitAddNew}>Salvar</button>
                      <button type="button" className="secondary-btn" onClick={cancelAddNew}>Cancelar</button>
                    </div>
                  </div>
                )}
              </div>

              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                getRowId={(params) => params.data.id}
                rowSelection="multiple"
                rowMultiSelectWithClick={true}
                onGridReady={(params) => {
                  gridApiRef.current = params.api
                }}
                domLayout="autoHeight"
                enableBrowserTooltips={true}
                tooltipShowDelay={0}
                defaultColDef={{ resizable: true }}
                onCellValueChanged={handleCellValueChanged}
                rowClassRules={{
                  'shiny-row': (params) => params.data?.shiny === true,
                  'sold-row': (params) => params.data?.status?.toLowerCase() === 'vendido',
                  'reserved-row': (params) => params.data?.status?.toLowerCase() === 'reservado',
                }}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default AdminSales
