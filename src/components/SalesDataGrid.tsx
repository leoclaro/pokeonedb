import { DataGrid, type Column } from 'react-data-grid'
import type { SaleRecord } from '../types'

interface SalesDataGridProps {
  rows: SaleRecord[]
  columns: readonly Column<SaleRecord>[]
  rowKeyGetter: (row: SaleRecord) => string
  rowClass?: (row: SaleRecord) => string | undefined
  selectedRows?: ReadonlySet<string>
  onSelectedRowsChange?: (nextSelectedRows: ReadonlySet<string>) => void
}

function SalesDataGrid({
  rows,
  columns,
  rowKeyGetter,
  rowClass,
  selectedRows,
  onSelectedRowsChange,
}: SalesDataGridProps) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      rowKeyGetter={rowKeyGetter}
      rowClass={rowClass}
      selectedRows={selectedRows}
      onSelectedRowsChange={onSelectedRowsChange}
      defaultColumnOptions={{ resizable: true, sortable: true }}
      style={{ minHeight: 400 }}
    />
  )
}

export default SalesDataGrid
