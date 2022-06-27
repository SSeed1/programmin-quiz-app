import axios from 'axios'

import axiosInstance from './interceptors'

export const signUp = async payload => {
  console.log(payload)
  const data = await axiosInstance.post(
    `https://localhost:8081/register`,
    payload
  )
  console.log(data)
  return data
}