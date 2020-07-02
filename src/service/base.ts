import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ResponseFormat {
  success?: boolean;
  data?: any;
}

const handleError = (err: any) => {
  const msg = err.message || err.msg || ''
  alert(`请求失败：${msg}`)
}

const handleSuccess = (res: AxiosResponse, resolve: (res: any) => void) => {
  const response: ResponseFormat = res.data
  if (response.hasOwnProperty('success')) {
    if (response.success) {
      resolve(response)
    } else {
      handleError(response)
    }
  } else {
    handleError(response)
  }
}

class SDK {
  $http: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    console.log('SDK config:', config)
    this.$http = axios.create(config || {})
  }

  get(url: string, params?: object): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.$http
          .get(url, { params })
          .then(res => handleSuccess(res, resolve))
          .catch(handleError)
    })
  }

  post(url: string, data?: object): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.$http
          .post(url, data)
          .then(res => handleSuccess(res, resolve))
          .catch(handleError)
    })
  }
}

export default SDK
