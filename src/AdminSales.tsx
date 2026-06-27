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
  shiny: boolean
  price: number
  status: string
}

const salesCollectionName = 'pokemonSales'
const salesCollectionRef = collection(db, salesCollectionName)

const STATUS_OPTIONS = ['Disponível', 'Reservado', 'Vendido'] as const
const SHINY_OPTIONS = ['Não', 'Sim'] as const
const NATURES = [
  'Adamant', 'Bashful', 'Bold', 'Brave', 'Calm', 'Careful', 'Docile', 'Gentle', 'Hardy', 'Hasty',
  'Impish', 'Jolly', 'Lax', 'Lonely', 'Mild', 'Modest', 'Naive', 'Naughty', 'Quiet', 'Quirky',
  'Rash', 'Relaxed', 'Sassy', 'Serious', 'Timid',
] as const


const getSaleRowsFromSnapshot = (docs: any[]) =>
  docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SaleRecord[]

const parseEditableValue = (field: string, value: any) => {
  if (field === 'level' || field === 'price') {
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
        setShowAddForm(true)
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
    setShowAddForm(true)
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
      setShowAddForm(false)
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
    setShowAddForm(false)
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
            &nbsp;&nbsp;<button type="button" className="secondary-btn" onClick={handleSignOut}>
                Sair
            </button>
          </p>
        </div>
      )}

      {error ? (
        <div className="sales-error">
          <p>{error}
          &nbsp;&nbsp;<button type="button" className="primary-btn" onClick={fetchSales}>
            Tentar novamente
          </button>
          </p>
        </div>
      ) : null}

      {user && (
        <>
          {loading ? (
            <p>Carregando vendas para edição...</p>
          ) : (
            <div className="ag-theme-alpine sales-grid" style={{ padding: '1em' }}>
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
                    {/* reuse same inputs for add and edit */}
                    {(() => {
                      const isEditing = !!editingRow
                      const getFormValue = (field: keyof SaleRecord) => (isEditing ? (editingRow as any)[field] : (newRow as any)[field])
                      const setFormValue = (field: keyof SaleRecord, value: any) => {
                        if (isEditing) {
                          setEditingRow((prev) => (prev ? ({ ...prev, [field]: value } as SaleRecord) : prev))
                        } else {
                          setNewRow((prev) => ({ ...prev, [field]: value }))
                        }
                      }

                      return (
                        <>
                          <input placeholder="Pokemon" value={getFormValue('pokemon')} onChange={(e) => setFormValue('pokemon', e.target.value)} />
                          <input type="number" placeholder="Level" value={getFormValue('level') as number} onChange={(e) => setFormValue('level', Number(e.target.value))} />
                          <input placeholder="Ability" value={getFormValue('ability')} onChange={(e) => setFormValue('ability', e.target.value)} />
                          <select value={getFormValue('nature') || ''} onChange={(e) => setFormValue('nature', e.target.value)}>
                            <option value="">-- Nature --</option>
                            {NATURES.map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          <input placeholder="IVs (HP/ATK/DEF/SATK/SDEF/SPD)" value={getFormValue('ivs')} onChange={(e) => setFormValue('ivs', e.target.value)} />
                          <select value={(getFormValue('shiny') ? 'Sim' : 'Não')} onChange={(e) => setFormValue('shiny', e.target.value === 'Sim')}>
                            {SHINY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <input type="number" placeholder="Preço" value={getFormValue('price') as number} onChange={(e) => setFormValue('price', Number(e.target.value))} />
                          <select value={getFormValue('status') || ''} onChange={(e) => setFormValue('status', e.target.value)}>
                            <option value="">-- Status --</option>
                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <div style={{ display: 'flex', gap: 8 }}>
                            {isEditing ? (
                              <>
                                <button type="button" className="primary-btn" onClick={submitEdit}>Salvar edição</button>
                                <button type="button" className="secondary-btn" onClick={cancelEdit}>Cancelar</button>
                              </>
                            ) : (
                              <>
                                <button type="button" className="primary-btn" onClick={submitAddNew}>Salvar</button>
                                <button type="button" className="secondary-btn" onClick={cancelAddNew}>Cancelar</button>
                              </>
                            )}
                          </div>
                        </>
                      )
                    })()}
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
