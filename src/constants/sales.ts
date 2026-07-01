import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import type { SaleRecord, ItemRecord } from '../types'

export const salesCollectionName = 'pokemonSales'
export const itemSalesCollectionName = 'itemSales'
export const historyCollectionName = 'salesHistory'
export const salesCollectionRef = collection(db, salesCollectionName)
export const itemSalesCollectionRef = collection(db, itemSalesCollectionName)
export const historyCollectionRef = collection(db, historyCollectionName)

export const STATUS_OPTIONS = ['Disponível', 'Reservado', 'Vendido'] as const
export const SHINY_OPTIONS = ['Não', 'Sim'] as const
export const NATURES = [
  'Adamant', 'Bashful', 'Bold', 'Brave', 'Calm', 'Careful', 'Docile', 'Gentle', 'Hardy', 'Hasty',
  'Impish', 'Jolly', 'Lax', 'Lonely', 'Mild', 'Modest', 'Naive', 'Naughty', 'Quiet', 'Quirky',
  'Rash', 'Relaxed', 'Sassy', 'Serious', 'Timid',
] as const
export const IV_LABELS = ['HP', 'ATK', 'DEF', 'SATK', 'SDEF', 'SPD'] as const

export const seedRowData: SaleRecord[] = [
  {
    pokemon: 'Charizard',
    level: 72,
    ability: 'Blaze',
    nature: 'Timid',
    ivs: '31/30/31/31/31/29',
    shiny: false,
    price: 450,
    status: 'Disponível',
  },
  {
    pokemon: 'Gengar',
    level: 65,
    ability: 'Levitate',
    nature: 'Timid',
    ivs: '31/31/30/31/31/31/31',
    shiny: true,
    price: 380,
    status: 'Vendido',
  },
  {
    pokemon: 'Gardevoir',
    level: 70,
    ability: 'Trace',
    nature: 'Modest',
    ivs: '31/31/31/30/31/31/31',
    shiny: false,
    price: 500,
    status: 'Reservado',
  },
  {
    pokemon: 'Gardevoir',
    level: 70,
    ability: 'Trace',
    nature: 'Modest',
    ivs: '31/31/31/30/31/31/31',
    shiny: true,
    price: 500,
    status: 'Disponível',
  },
]

export const getSaleRowsFromSnapshot = (docs: any[]) =>
  docs.map((doc) => ({ id: doc.id, ...doc.data() })) as SaleRecord[]

export const getItemRowsFromSnapshot = (docs: any[]) =>
  docs.map((doc) => {
    const data = doc.data()
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate().toLocaleString('pt-BR') : data.createdAt
    return ({ id: doc.id, ...data, createdAt }) as ItemRecord
  })

export const getIvsParts = (ivs: string) => {
  const parts = ivs?.split('/').map((part) => part.trim()) ?? []
  return [...parts, '0', '0', '0', '0', '0'].slice(0, 6)
}

export const mergeIvsParts = (parts: string[]) =>
  parts
    .slice(0, 6)
    .map((part) => {
      const value = Number(part)
      return Number.isNaN(value) ? '0' : String(value)
    })
    .join('/')

const formatCompactValue = (value: number) => {
  if (value >= 1000000) {
    const millions = value / 1000000
    const formatted = Number.isInteger(millions) ? String(millions) : millions.toFixed(1)
    return `${formatted}M`
  }

  if (value >= 1000) {
    const thousands = value / 1000
    const formatted = Number.isInteger(thousands) ? String(thousands) : thousands.toFixed(1)
    return `${formatted}k`
  }

  return String(value)
}

export const formatPrice = (value: number | string) => {
  if (typeof value !== 'number') return String(value)
  return `$ ${formatCompactValue(value)}`
}

export const logHistory = async (title: string, description: string) => {
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
