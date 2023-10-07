/* eslint-disable no-useless-catch */
import mainAxios from '../interceptor/axiosInstance'
import { type AxiosResponse } from 'axios'
import { apiEndpoints } from '../constants/api-endpoints'

// Function to sign up a user
export const signUp = async (userData: any): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await mainAxios.post(apiEndpoints.SIGN_UP, userData)
    return response
  } catch (error) {
    throw error
  }
}

// Function to log in a user
export const login = async (userData: any): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await mainAxios.post(apiEndpoints.LOGIN, userData)
    return response
  } catch (error) {
    throw error
  }
}

// Function to log out user and expire user token
export const logout = async (): Promise<AxiosResponse> => {
  try {
    const response: AxiosResponse = await mainAxios.post(apiEndpoints.LOGOUT)
    return response
  } catch (error) {
    throw error
  }
}
