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
