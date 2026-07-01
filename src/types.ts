export type MenuItem = {
  label: string
  path: string
}

export interface HistoryRecord {
  id?: string
  title: string
  description: string
  date: string
}

export interface SaleRecord {
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

export type SaleFormValues = Omit<SaleRecord, 'id'>
