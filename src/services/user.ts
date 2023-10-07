/* eslint-disable no-template-curly-in-string */
import mainAxios from '../interceptor/axiosInstance'
import { type AxiosResponse } from 'axios'
import { apiEndpoints } from '../constants/api-endpoints'

export const loggedInUserDetails = async (): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'get',
    url: apiEndpoints.LOGGED_IN_USER_DETAILS
  })
}

export const expenseDetails = async (userId: string): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'get',
    url: apiEndpoints.EXPENSE_DETAILS.replace('${USER_ID}', userId)
  })
}

export const categoryList = async (userId: string): Promise<AxiosResponse> => {
  return await mainAxios({
    method: 'get',
    url: apiEndpoints.CATEGORY_LIST.replace('${USER_ID}', userId)
  })
}
