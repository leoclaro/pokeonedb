import { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ModuleRegistry,
  ClientSideRowModelModule,
  RowStyleModule,
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
      { field: 'pokemon', headerName: 'Pokemon', flex: 1, sortable: true, filter: true, editable: true },
      {
        field: 'level',
        headerName: 'Level',
        width: 110,
        sortable: true,
        filter: 'agNumberColumnFilter',
        editable: true,
        valueParser: ({ newValue }) => Number(newValue),
      },
      { field: 'ability', headerName: 'Ability', flex: 1, sortable: true, filter: true, editable: true },
      { field: 'nature', headerName: 'Nature', flex: 1, sortable: true, filter: true, editable: true },
      {
        field: 'ivs',
        headerName: "IV's",
        flex: 1,
        sortable: true,
        filter: true,
        editable: true,
        headerTooltip: 'HP/ATK/DEF/SATK/SDEF/SPD',
        tooltipValueGetter: () => 'HP/ATK/DEF/SATK/SDEF/SPD',
      },
      {
        field: 'quantity',
        headerName: 'Quantidade',
        width: 130,
        sortable: true,
        filter: 'agNumberColumnFilter',
        editable: true,
        valueParser: ({ newValue }) => Number(newValue),
      },
      {
        field: 'shiny',
        headerName: 'Shiny',
        width: 110,
        sortable: true,
        filter: true,
        editable: true,
        valueFormatter: ({ value }) => (value ? 'Sim' : 'Não'),
        valueParser: ({ newValue }) => String(newValue).toLowerCase() === 'sim',
      },
      {
        field: 'price',
        headerName: 'P. Dollars',
        width: 140,
        sortable: true,
        filter: 'agNumberColumnFilter',
        editable: true,
        valueFormatter: ({ value }) => {
          if (typeof value !== 'number') return value
          if (value >= 1000) return `$ ${Math.round(value / 1000)}k`
          return `$ ${value}`
        },
        valueParser: ({ newValue }) => Number(newValue),
      },
      { field: 'status', headerName: 'Status atual', width: 150, sortable: true, filter: true, editable: true },
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
        <div className="admin-auth-panel admin-auth-signed">
          <p>Logado como <strong>{user.email}</strong></p>
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
          {loading ? (
            <p>Carregando vendas para edição...</p>
          ) : (
            <div className="ag-theme-alpine sales-grid">
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
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
