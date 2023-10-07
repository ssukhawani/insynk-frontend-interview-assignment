export interface CategoryDetails {
  id: number
  name: string
  is_main: boolean
  created_at: string
  updated_at: string
  user: number
}

export interface CategoryUpdate {
  name: string
  is_main: boolean
  user: number
}

export interface ExpenseDetails {
  id: number
  amount: string
  date: string
  description: string
  type: 'IN' | 'OUT'
  created_at: string
  updated_at: string
  user: number
  category: number
}

export interface ExpenseUpdate {
  amount: string
  date: string
  description: string
  type: 'IN' | 'OUT'
  user: number
  category: number
}
