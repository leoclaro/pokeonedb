import { useEffect, useMemo, useState } from 'react'
import { SelectColumn, type Column } from 'react-data-grid'
import { query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, type User } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth, googleProvider } from './firebase'
import SalesDataGrid from './components/SalesDataGrid'
import AdminSaleForm from './components/AdminSaleForm'
import type { SaleRecord, SaleFormValues } from './types'
import { salesCollectionRef, getSaleRowsFromSnapshot, formatPrice, logHistory } from './constants/sales'
import 'react-data-grid/lib/styles.css'

const initialSaleForm: SaleFormValues = {
  pokemon: '',
  level: 1,
  ability: '',
  nature: '',
  ivs: '31/31/31/31/31/31',
  shiny: false,
  price: 0,
  status: 'Disponível',
}

function AdminSales() {
  const [user, setUser] = useState<User | null>(null)
  const [rowData, setRowData] = useState<SaleRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(() => new Set())
  const [showAddForm, setShowAddForm] = useState(false)
  const [newRow, setNewRow] = useState<SaleFormValues>(initialSaleForm)
  const [editingRow, setEditingRow] = useState<SaleRecord | null>(null)
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

  const handleAddNew = () => {
    setEditingRow(null)
    setNewRow(initialSaleForm)
    setShowAddForm(true)
  }

  const setFormField = (field: keyof SaleFormValues, value: string | number | boolean) => {
    if (editingRow) {
      setEditingRow((prev) => (prev ? ({ ...prev, [field]: value } as SaleRecord) : prev))
    } else {
      setNewRow((prev) => ({ ...prev, [field]: value }))
    }
  }

  const submitAddNew = async () => {
    setError(null)
    try {
      await addDoc(salesCollectionRef, {
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
      setNewRow(initialSaleForm)

      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao adicionar nova venda.')
    }
  }

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
      await updateDoc(doc(salesCollectionRef, id), data)

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
          return deleteDoc(doc(salesCollectionRef, id))
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
        renderCell: ({ row }: { row: SaleRecord }) => <>{formatPrice(row.price)}</>,
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
                  <AdminSaleForm
                    formData={editingRow ? {
                      pokemon: editingRow.pokemon,
                      level: editingRow.level,
                      ability: editingRow.ability,
                      nature: editingRow.nature,
                      ivs: editingRow.ivs,
                      shiny: editingRow.shiny,
                      price: editingRow.price,
                      status: editingRow.status,
                    } : newRow}
                    isEditing={!!editingRow}
                    onChange={setFormField}
                    onSubmit={editingRow ? submitEdit : submitAddNew}
                    onCancel={() => {
                      setEditingRow(null)
                      setShowAddForm(false)
                    }}
                  />
                )}
              </div>

              <SalesDataGrid
                rows={rowData}
                columns={columns}
                rowKeyGetter={rowKeyGetter}
                selectedRows={selectedRows}
                onSelectedRowsChange={(nextSelected) => setSelectedRows(new Set(nextSelected))}
                rowClass={rowClass}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default AdminSales
