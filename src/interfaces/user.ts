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
  type: 'IN' | 'OUT' | string
  user: number | string
  category: number | string
}

export interface Expense {
  id: number
  amount: string
  date: string
  description: string
  type: string
  created_at: string
  updated_at: string
  user: number
  category: number
  category_data: CategoryDetails
}
