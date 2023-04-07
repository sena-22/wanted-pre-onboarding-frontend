import axios from 'axios'
import {BASE_URL} from './const'
import {saveTokenToLocalStorage} from '../utils/tokenHandler'

export const sign_up = async args => {
  const sign_up_res = await axios.post(
    `${BASE_URL}/auth/signup`,
    {email: args.email, password: args.password},
    {
      headers: {'Content-Type': 'application/json'}
    }
  )
  return sign_up_res
}

export const sign_in = async args => {
  try {
    const sign_in_res = await axios.post(
      `${BASE_URL}/auth/signin`,
      {email: args.email, password: args.password},
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
    if (sign_in_res.status === 200) {
      const login_res = sign_in_res.data
      saveTokenToLocalStorage(login_res.access_token)
      return 'success'
    }
  } catch (err) {
    console.log(err)
  }
}
