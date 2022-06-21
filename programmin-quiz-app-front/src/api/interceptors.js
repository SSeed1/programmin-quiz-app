import axios from 'axios'

import router from '../router'
import store from '../store/index'
import { updateTokens } from './authApi'
import { getUserSubscription } from './subscriptionsApi'

const axiosInstance = axios.create()

const requestInterceptor = async config => {
  const accessToken = sessionStorage.getItem('accessToken')
  config.headers['X-Authorization'] = `Bearer ${accessToken}`

  return config
}
const requestInterceptorId = axiosInstance.interceptors.request.use(requestInterceptor)

axiosInstance.interceptors.response.use(null, async error => {
  const { response, config: originalRequest } = error

  if (!response) throw error

  const isAccessTokenStale = (response.status === 401 && !originalRequest.url.includes('/token'))

  if (isAccessTokenStale) {
    axiosInstance.interceptors.request.eject(requestInterceptorId)

    const refreshToken = sessionStorage.getItem('refreshToken')
    const requestConfig = { headers: { 'X-Authorization': refreshToken } }

    try {
      const { access_token, refresh_token } = await updateTokens(requestConfig)
      sessionStorage.setItem('accessToken', access_token)
      sessionStorage.setItem('refreshToken', refresh_token)
      axiosInstance.interceptors.request.use(requestInterceptor)

      return axiosInstance(originalRequest)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        sessionStorage.removeItem('accessToken')
        sessionStorage.removeItem('refreshToken')
        sessionStorage.removeItem('currentUser')
        axiosInstance.interceptors.request.use(requestInterceptor)
        
        router.push({ name: 'SignIn', params: { isRelogin: true } })
        
        return new Promise(() => {})
      } else {
        throw error
      }
    }
  }

  const isPaymentRequired = (response.status === 402)

  if (isPaymentRequired) {
    const { subscription: { status } } = await getUserSubscription()
    store.dispatch('updateUserLocally', { subscription: { status } })

    return
  }

  throw error
})

export default axiosInstance
