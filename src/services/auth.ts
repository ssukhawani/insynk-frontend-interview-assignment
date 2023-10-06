/* eslint-disable no-useless-catch */
import mainAxios from '../interceptor/axiosInstance' // Import your Axios instance
import { type AxiosResponse } from 'axios' // Import AxiosResponse type
import { apiEndpoints } from '../constants/api-endpoints' // Import your API endpoints

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
