import axios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'

interface SuccessFormat {
  success?: boolean;
  data?: any;
}

const handleError = (err: any) => {
  let msg = err.message || err.msg || ''
  alert(`请求失败，请重新刷新页面尝试：${msg}`)
}

const handleResponse = (res: AxiosResponse, resolve: (res: any) => void) => {
  const response: SuccessFormat = res.data
  if (response.hasOwnProperty('success')) {
    if (response.success) {
      resolve(res)
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
    this.$http = axios.create(config || {})
  }

  get(url: string, params?: object): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.$http
          .get(url, { params })
          .then(res => handleResponse(res, resolve))
          .catch(handleError)
    })
  }

  post(url: string, data?: object): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      this.$http
          .post(url, { data })
          .then(res => handleResponse(res, resolve))
          .then(handleError)
    })
  }
}

export default SDK
