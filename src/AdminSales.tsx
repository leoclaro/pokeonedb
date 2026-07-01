import { useEffect, useMemo, useState } from 'react'
import { DataGrid, SelectColumn, type Column } from 'react-data-grid'
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
import { db, auth, googleProvider } from './firebase'
import 'react-data-grid/lib/styles.css'

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
const historyCollectionName = 'salesHistory'
const historyCollectionRef = collection(db, historyCollectionName)

const STATUS_OPTIONS = ['Disponível', 'Reservado', 'Vendido'] as const
const SHINY_OPTIONS = ['Não', 'Sim'] as const
const NATURES = [
  'Adamant', 'Bashful', 'Bold', 'Brave', 'Calm', 'Careful', 'Docile', 'Gentle', 'Hardy', 'Hasty',
  'Impish', 'Jolly', 'Lax', 'Lonely', 'Mild', 'Modest', 'Naive', 'Naughty', 'Quiet', 'Quirky',
  'Rash', 'Relaxed', 'Sassy', 'Serious', 'Timid',
] as const


const getSaleRowsFromSnapshot = (docs: any[]) =>
  docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SaleRecord[]

const IV_LABELS = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'] as const

const getIvsParts = (ivs: string) => {
  const parts = ivs?.split('/').map((part) => part.trim()) ?? []
  return [...parts, '0', '0', '0', '0', '0'].slice(0, 6)
}

const mergeIvsParts = (parts: string[]) =>
  parts
    .slice(0, 6)
    .map((part) => {
      const value = Number(part)
      return Number.isNaN(value) ? '0' : String(value)
    })
    .join('/')

const logHistory = async (title: string, description: string) => {
  try {
    await addDoc(historyCollectionRef, {
      title,
      description,
      timestamp: serverTimestamp(),
    })
    return true
  } catch (err) {
    console.error('Falha ao registrar histórico de vendas:', err)
    return false
  }
}

function AdminSales() {
  const [user, setUser] = useState<User | null>(null)
  const [rowData, setRowData] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(() => new Set())
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
  const [editingOriginalStatus, setEditingOriginalStatus] = useState<string | null>(null)

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

      const historyOk = await logHistory(
        `Adicionado para venda: ${newRow.pokemon}`,
        `Pokemon ${newRow.pokemon} adicionado com preço ${newRow.price} e status ${newRow.status}.`
      )
      if (!historyOk) {
        setError('A venda foi criada, mas falhou ao registrar o histórico de vendas.')
      }

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
    const selectedIds = Array.from(selectedRows)
    if (selectedIds.length === 0) {
      if (rowData.length > 0) {
        setEditingRow(rowData[0])
        setEditingOriginalStatus(String(rowData[0]?.status ?? ''))
        setShowAddForm(true)
        return
      }
      setError('Selecione uma linha para editar.')
      return
    }
    if (selectedIds.length > 1) {
      setError('Selecione apenas uma linha para editar.')
      return
    }

    const selectedId = selectedIds[0]
    const selectedRow = rowData.find((row) => row.id === selectedId)
    if (!selectedRow) {
      setError('Erro ao localizar a linha selecionada.')
      return
    }

    setEditingRow(selectedRow)
    setEditingOriginalStatus(String(selectedRow.status ?? ''))
    setShowAddForm(true)
  }

  const submitEdit = async () => {
    if (!editingRow?.id) return
    setError(null)
    try {
      const { id, ...data } = editingRow
      await updateDoc(doc(db, salesCollectionName, id), data)

      if (editingOriginalStatus !== 'Vendido' && data.status === 'Vendido') {
        const historyOk = await logHistory(
          `Pokémon vendido: ${editingRow.pokemon}`,
          `O Pokémon ${editingRow.pokemon} foi marcado como vendido.`
        )
        if (!historyOk) {
          setError('Status atualizado, mas falhou ao registrar no histórico de vendas.')
        }
      }

      // update local state immediately so UI reflects change even if network hiccup
      setRowData((prev) => prev.map((r) => (r.id === id ? ({ id, ...data } as SaleRecord) : r)))
      setEditingRow(null)
      setEditingOriginalStatus(null)
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
      if (selectedRows.size === 0) {
        setError('Nenhuma linha selecionada para remoção.')
        return
      }

      await Promise.all(
        Array.from(selectedRows).map((id) => {
          if (!id) return Promise.resolve()
          return deleteDoc(doc(db, salesCollectionName, id))
        })
      )

      setSelectedRows(new Set())
      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao remover vendas selecionadas.')
    }
  }

  const rowKeyGetter = (row: SaleRecord) => row.id ?? ''

  const rowClass = (row: SaleRecord) => {
    const status = String(row.status || '').toLowerCase()
    const classes = []
    if (status === 'vendido') classes.push('sold-row')
    if (status === 'reservado') classes.push('reserved-row')
    if (row.shiny) classes.push('shiny-row')
    return classes.join(' ') || undefined
  }

  const columns = useMemo<readonly Column<SaleRecord>[]>(
    () => [
      SelectColumn,
      { key: 'pokemon', name: 'Pokemon', sortable: true, resizable: true },
      { key: 'level', name: 'Level', sortable: true, resizable: true, width: 100 },
      { key: 'ability', name: 'Ability', sortable: true, resizable: true },
      { key: 'nature', name: 'Nature', sortable: true, resizable: true },
      { key: 'ivs', name: "IV's", sortable: true, resizable: true },
      {
        key: 'shiny',
        name: 'Shiny',
        sortable: true,
        resizable: true,
        renderCell: ({ row }: { row: SaleRecord }) => <>{row.shiny ? 'Sim' : 'Não'}</>,
      },
      {
        key: 'price',
        name: 'P. Dollars',
        sortable: true,
        resizable: true,
        width: 130,
        renderCell: ({ row }: { row: SaleRecord }) => {
          const value = row.price
          if (typeof value !== 'number') return <>{value}</>
          return <>{value >= 1000 ? `$ ${Math.round(value / 1000)}k` : `$ ${value}`}</>
        },
      },
      { key: 'status', name: 'Status atual', sortable: true, resizable: true, width: 140 },
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
            <div className="sales-grid" style={{ padding: '1em' }}>
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
                  <div className="add-form">
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
                          <label className="admin-field">
                            <span>Pokemon</span>
                            <input placeholder="Nome do Pokémon" value={getFormValue('pokemon')} onChange={(e) => setFormValue('pokemon', e.target.value)} />
                          </label>
                          <label className="admin-field">
                            <span>Level</span>
                            <input type="number" placeholder="Ex: 72" value={getFormValue('level') as number} onChange={(e) => setFormValue('level', Number(e.target.value))} />
                          </label>
                          <label className="admin-field">
                            <span>Ability</span>
                            <input placeholder="Habilidade" value={getFormValue('ability')} onChange={(e) => setFormValue('ability', e.target.value)} />
                          </label>
                          <label className="admin-field">
                            <span>Nature</span>
                            <select value={getFormValue('nature') || ''} onChange={(e) => setFormValue('nature', e.target.value)}>
                              <option value="">-- Selecione a Nature --</option>
                              {NATURES.map(n => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </label>
                          <fieldset className="admin-ivs-fieldset">
                            <legend>IVs</legend>
                            <div className="admin-ivs-row">
                              {IV_LABELS.map((label, index) => {
                                const ivParts = getIvsParts(String(getFormValue('ivs') ?? ''))
                                return (
                                  <label key={label} className="admin-ivs-item">
                                    <span>{label}</span>
                                    <input
                                      type="number"
                                      min="0"
                                      max="31"
                                      placeholder="0"
                                      value={ivParts[index]}
                                      onChange={(e) => {
                                        const nextParts = [...ivParts]
                                        nextParts[index] = e.target.value
                                        setFormValue('ivs', mergeIvsParts(nextParts))
                                      }}
                                    />
                                  </label>
                                )
                              })}
                            </div>
                            <div className="admin-note">Sera salvo como HP/ATK/DEF/SATK/SDEF/SPD</div>
                          </fieldset>
                          <label className="admin-field">
                            <span>Shiny</span>
                            <select value={(getFormValue('shiny') ? 'Sim' : 'Não')} onChange={(e) => setFormValue('shiny', e.target.value === 'Sim')}>
                              {SHINY_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </label>
                          <label className="admin-field">
                            <span>Preço</span>
                            <input type="number" placeholder="Ex: 450" value={getFormValue('price') as number} onChange={(e) => setFormValue('price', Number(e.target.value))} />
                          </label>
                          <label className="admin-field">
                            <span>Status</span>
                            <select value={getFormValue('status') || ''} onChange={(e) => setFormValue('status', e.target.value)}>
                              <option value="">-- Selecione o Status --</option>
                              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </label>
                          <div className="admin-actions">
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

              <DataGrid
                columns={columns}
                rows={rowData}
                rowKeyGetter={rowKeyGetter}
                selectedRows={selectedRows}
                onSelectedRowsChange={(nextSelected) => setSelectedRows(new Set(nextSelected))}
                rowClass={rowClass}
                defaultColumnOptions={{ resizable: true, sortable: true }}
                style={{ minHeight: 400 }}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default AdminSales
