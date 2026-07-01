import { useEffect, useMemo, useState } from 'react'
import { SelectColumn, type Column } from 'react-data-grid'
import { query, orderBy, getDocs, doc, updateDoc, addDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut, type User } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth, googleProvider } from '../firebase'
import SalesDataGrid from '../components/SalesDataGrid'
import type { ItemRecord, ItemFormValues } from '../types'
import { itemSalesCollectionRef, getItemRowsFromSnapshot, formatPrice, logHistory } from '../constants/sales'
import './AdminItemSales.css'
import 'react-data-grid/lib/styles.css'

const initialItemForm: ItemFormValues = {
  name: '',
  category: '',
  status: 'Disponível',
  price: 0,
}

function AdminItemSales() {
  const [user, setUser] = useState<User | null>(null)
  const [rowData, setRowData] = useState<ItemRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedRows, setSelectedRows] = useState<ReadonlySet<string>>(() => new Set())
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState<ItemFormValues>(initialItemForm)
  const [editingRow, setEditingRow] = useState<ItemRecord | null>(null)
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
      const salesQuery = query(itemSalesCollectionRef, orderBy('createdAt'))
      const snapshot = await getDocs(salesQuery)
      setRowData(getItemRowsFromSnapshot(snapshot.docs))
    } catch (err) {
      console.error(err)
      setError('Falha ao carregar os itens do Firestore.')
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

  const setFormField = (field: keyof ItemFormValues, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [field]: value }))
    if (editingRow) {
      setEditingRow((prev) => (prev ? ({ ...prev, [field]: value } as ItemRecord) : prev))
    }
  }

  const handleAddNew = () => {
    setEditingRow(null)
    setFormValues(initialItemForm)
    setShowForm(true)
  }

  const submitAddNew = async () => {
    setError(null)
    try {
      await addDoc(itemSalesCollectionRef, {
        ...formValues,
        createdAt: serverTimestamp(),
      })

      const historyOk = await logHistory(
        `Adicionado item: ${formValues.name}`,
        `Item ${formValues.name} adicionado na coleção itemSales com preço ${formValues.price} e status ${formValues.status}.`
      )
      if (!historyOk) setError('Item adicionado, mas falha ao registrar histórico de vendas.')

      setShowForm(false)
      setFormValues(initialItemForm)
      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao adicionar novo item.')
    }
  }

  const handleEditSelected = () => {
    setError(null)
    const selectedIds = Array.from(selectedRows)
    if (selectedIds.length === 0) {
      if (rowData.length > 0) {
        setEditingRow(rowData[0])
        setEditingOriginalStatus(String(rowData[0]?.status ?? ''))
        setFormValues({
          name: rowData[0].name,
          category: rowData[0].category,
          status: rowData[0].status,
          price: rowData[0].price,
        })
        setShowForm(true)
        return
      }
      setError('Selecione um item para editar.')
      return
    }
    if (selectedIds.length > 1) {
      setError('Selecione apenas um item para editar.')
      return
    }
    const selectedRow = rowData.find((row) => row.id === selectedIds[0])
    if (!selectedRow) {
      setError('Erro ao localizar o item selecionado.')
      return
    }
    setEditingRow(selectedRow)
    setEditingOriginalStatus(String(selectedRow.status ?? ''))
    setFormValues({
      name: selectedRow.name,
      category: selectedRow.category,
      status: selectedRow.status,
      price: selectedRow.price,
    })
    setShowForm(true)
  }

  const submitEdit = async () => {
    if (!editingRow?.id) return
    setError(null)
    try {
      const { id, ...data } = editingRow
      await updateDoc(doc(itemSalesCollectionRef, id), data)

      if (editingOriginalStatus !== 'Vendido' && data.status === 'Vendido') {
        const historyOk = await logHistory(
          `Item vendido: ${editingRow.name}`,
          `Item ${editingRow.name} foi marcado como Vendido.`
        )
        if (!historyOk) setError('Status atualizado, mas falha ao registrar histórico de vendas.')
      }

      setRowData((prev) => prev.map((row) => (row.id === id ? ({ id, ...data } as ItemRecord) : row)))
      setEditingRow(null)
      setEditingOriginalStatus(null)
      setShowForm(false)
      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao salvar item.')
    }
  }

  const handleDeleteSelected = async () => {
    setError(null)
    try {
      if (selectedRows.size === 0) {
        setError('Nenhum item selecionado para remoção.')
        return
      }
      await Promise.all(
        Array.from(selectedRows).map((id) => {
          if (!id) return Promise.resolve()
          return deleteDoc(doc(itemSalesCollectionRef, id))
        })
      )
      setSelectedRows(new Set())
      await fetchSales()
    } catch (err) {
      console.error(err)
      setError('Falha ao remover itens selecionados.')
    }
  }

  const rowKeyGetter = (row: ItemRecord) => row.id ?? ''

  const rowClass = (row: ItemRecord) => {
    const classes = []
    if (row.status.toLowerCase() === 'vendido') classes.push('sold-row')
    if (row.status.toLowerCase() === 'reservado') classes.push('reserved-row')
    return classes.join(' ') || undefined
  }

  const columns = useMemo<readonly Column<ItemRecord>[]>(
    () => [
      SelectColumn,
      { key: 'name', name: 'Nome', sortable: true, resizable: true },
      { key: 'category', name: 'Categoria', sortable: true, resizable: true },
      { key: 'status', name: 'Status', sortable: true, resizable: true, width: 120 },
      {
        key: 'price',
        name: 'Preço',
        sortable: true,
        resizable: true,
        width: 120,
        renderCell: ({ row }: { row: ItemRecord }) => <>{formatPrice(row.price)}</>,
      },
      { key: 'createdAt', name: 'Criado em', sortable: true, resizable: true, width: 180 },
    ],
    []
  )

  return (
    <section className="sales-page admin-page">
      <div className="sales-header">
        <div>
          <p className="eyebrow">ADMIN DE ITENS</p>
          <h2>Cadastro e edição de itens à venda</h2>
        </div>
      </div>

      {!user ? (
        <div className="admin-auth-panel">
          <p>Faça login com sua conta Google para gerenciar os itens de venda.</p>
          <button type="button" className="primary-btn" onClick={handleSignIn}>
            Entrar com Google
          </button>
        </div>
      ) : (
        <div className="admin-user-panel">
          <p>
            Logado como <strong>{user.email}</strong>
            &nbsp;&nbsp;
            <button type="button" className="secondary-btn" onClick={handleSignOut}>
              Sair
            </button>
          </p>
        </div>
      )}

      {error && (
        <div className="sales-error">
          <p>{error}</p>
        </div>
      )}

      {user && (
        <>
          {loading ? (
            <p>Carregando itens para edição...</p>
          ) : (
            <div className="sales-grid" style={{ padding: '1em' }}>
              <div className="admin-grid-actions" style={{ marginBottom: 8 }}>
                {!showForm ? (
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
                    <label className="admin-field">
                      <span>Nome</span>
                      <input
                        placeholder="Nome do item"
                        value={formValues.name}
                        onChange={(e) => setFormField('name', e.target.value)}
                      />
                    </label>
                    <label className="admin-field">
                      <span>Categoria</span>
                      <input
                        placeholder="Categoria"
                        value={formValues.category}
                        onChange={(e) => setFormField('category', e.target.value)}
                      />
                    </label>
                    <label className="admin-field">
                      <span>Status</span>
                      <select value={formValues.status} onChange={(e) => setFormField('status', e.target.value)}>
                        <option value="Disponível">Disponível</option>
                        <option value="Reservado">Reservado</option>
                        <option value="Vendido">Vendido</option>
                      </select>
                    </label>
                    <label className="admin-field">
                      <span>Preço</span>
                      <input
                        type="number"
                        placeholder="Ex: 150"
                        value={formValues.price}
                        onChange={(e) => setFormField('price', Number(e.target.value))}
                      />
                    </label>
                    <div className="admin-actions">
                      {editingRow ? (
                        <>
                          <button type="button" className="primary-btn" onClick={submitEdit}>
                            Salvar edição
                          </button>
                          <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" className="primary-btn" onClick={submitAddNew}>
                            Salvar
                          </button>
                          <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>
                            Cancelar
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <SalesDataGrid
                rows={rowData}
                columns={columns}
                rowKeyGetter={rowKeyGetter}
                selectedRows={selectedRows}
                onSelectedRowsChange={(nextSelected) => setSelectedRows(new Set(Array.from(nextSelected) as string[]))}
                rowClass={rowClass}
              />
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default AdminItemSales
