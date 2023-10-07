/* eslint-disable indent */
import axios, {
  type AxiosError,
  type AxiosInstance,
  // AxiosRequestConfig, // Change to InternalAxiosRequestConfig
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  type AxiosRequestConfig
} from 'axios'
import { deleteLocalStorageItem, getLocalStorageItem } from '../utility/localStorage'
import { toast } from 'react-toastify'
import { type UserDetails } from '../interfaces/auth'

// For Make Log on Develop Mode
const logOnDev = (message: string) => {
  if (process.env.REACT_APP_ENV === 'development') {
    console.log(message)
  }
}

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method, url } = config
  // Set Headers Here
  const user: UserDetails | null = getLocalStorageItem('user') ?? null
  if (user != null) {
    config.headers.Authorization = `Token ${user.auth_token}`
  }

  // Check Authentication Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)

  if (method === 'get') {
    config.timeout = 15000
  }
  return config
}
const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config
  const { status } = response
  // Handle Response Data Here
  // Error Handling When Return Success with Error Code Here
  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Response ${status}`)

  return response
}

const onErrorResponse = async (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error
    const { method, url } = error.config as AxiosRequestConfig
    const { status } = (error.response as AxiosResponse) ?? {}

    logOnDev(`🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`)

    switch (status) {
      case 401: {
        // "Login required"
        logOnDev('🚨 Unauthorised')
        toast.error('Unauthorised', {
          toastId: 'unauthorized'
        })
        window.location.href = '/'
        break
      }
      case 403: {
        // "Permission denied"
        logOnDev('🚨 Permission denied')
        toast.error('Permission denied', {
          toastId: 'perm-denied'
        })
        break
      }
      case 404: {
        // "Invalid request"
        logOnDev('🚨 Invalid request')
        toast.error('Invalid request', {
          toastId: 'invalid'
        })
        break
      }
      case 500: {
        // "Server error"
        logOnDev('🚨 Server error')
        toast.error('Server error', {
          toastId: 'server-err'
        })
        break
      }
      default: {
        // "Unknown error occurred"
        logOnDev('🚨 Unknown error occurred')
        toast.error('Unknown error occurred', {
          toastId: 'unknown-err'
        })
        break
      }
    }

    if (status === 401) {
      // Delete Token & Go To Login Page if you required.
      deleteLocalStorageItem('user')
    }
  } else {
    logOnDev(`🚨 [API] | Error ${error.message}`)
  }

  return await Promise.reject(error)
}

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse)
  instance.interceptors.response.use(onResponse, onErrorResponse)

  return instance
}
