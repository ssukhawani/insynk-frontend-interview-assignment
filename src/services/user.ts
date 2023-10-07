/* eslint-disable no-template-curly-in-string */
import mainAxios from '../interceptor/axiosInstance'
import { type AxiosResponse } from 'axios'
import { apiEndpoints } from '../constants/api-endpoints'
import { type ExpenseUpdate, type CategoryUpdate } from '../interfaces/user'

export const loggedInUserDetails = async (): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'get',
    url: apiEndpoints.LOGGED_IN_USER_DETAILS
  })
}

export const categoryList = async (userId: string): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'get',
    url: apiEndpoints.CATEGORY_LIST.replace('${USER_ID}', userId)
  })
}

export const deleteCategory = async (categoryId: number): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'delete',
    url: apiEndpoints.CATEGORY_DELETE.replace('${CAT_ID}', categoryId.toString())
  })
}

export const updateCategory = async (
  categoryId: number,
  newCategory: CategoryUpdate | null
): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'put',
    url: apiEndpoints.CATEGORY_UPDATE.replace('${CAT_ID}', categoryId.toString()),
    data: newCategory
  })
}

export const createCategory = async (newCategory: CategoryUpdate): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'post',
    url: apiEndpoints.CATEGORY_CREATE.replace('${USER_ID}', newCategory.user.toString()),
    data: newCategory
  })
}

export const expenseDetails = async (userId: string): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'get',
    url: apiEndpoints.EXPENSE_DETAILS.replace('${USER_ID}', userId)
  })
}

// All services related to expenses or income done by users
export const createExpense = async (newExpense: ExpenseUpdate): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'post',
    url: apiEndpoints.EXPENSE_CREATE.replace('${USER_ID}', newExpense.user.toString()),
    data: newExpense
  })
}

export const updateExpense = async (
  expenseId: number,
  newExpense: ExpenseUpdate | null
): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'put',
    url: apiEndpoints.EXPENSE_UPDATE.replace('${EXP_ID}', expenseId.toString()),
    data: newExpense
  })
}

export const deleteExpense = async (expenseId: number): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'delete',
    url: apiEndpoints.EXPENSE_DELETE.replace('${EXP_ID}', expenseId.toString())
  })
}
