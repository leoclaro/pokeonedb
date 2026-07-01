import { DataGrid, type Column } from 'react-data-grid'

interface SalesDataGridProps<T, K extends React.Key = string> {
  rows: T[]
  columns: readonly Column<T>[]
  rowKeyGetter: (row: T) => K
  rowClass?: (row: T) => string | undefined
  selectedRows?: ReadonlySet<K>
  onSelectedRowsChange?: (nextSelectedRows: Set<K>) => void
}

function SalesDataGrid<T, K extends React.Key = string>({
  rows,
  columns,
  rowKeyGetter,
  rowClass,
  selectedRows,
  onSelectedRowsChange,
}: SalesDataGridProps<T, K>) {
  return (
    <DataGrid<T, unknown, K>
      rows={rows}
      columns={columns}
      rowKeyGetter={rowKeyGetter}
      rowClass={rowClass}
      selectedRows={selectedRows as any}
      onSelectedRowsChange={onSelectedRowsChange as any}
      defaultColumnOptions={{ resizable: true, sortable: true }}
      style={{ minHeight: 400 }}
    />
  )
}

export default SalesDataGrid
