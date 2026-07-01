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

export interface ItemRecord {
  id?: string
  name: string
  category: string
  status: string
  price: number
  createdAt?: string
}

export type ItemFormValues = Omit<ItemRecord, 'id' | 'createdAt'>
