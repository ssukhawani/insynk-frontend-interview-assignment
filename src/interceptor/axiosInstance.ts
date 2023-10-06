// axiosInstance.ts

import axios, { type AxiosInstance } from 'axios'
import { toastMsg } from '../constants/toast-messages'

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}`,
  timeout: 20000,
  timeoutErrorMessage: toastMsg.SERVER_NOT_RESPONDING
})

export default instance
