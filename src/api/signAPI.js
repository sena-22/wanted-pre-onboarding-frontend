import {BASE_URL} from './const'
import axios from 'axios'

export const signup = async args => {
  const signupRes = await axios.post(
    `${BASE_URL}/auth/signup`,
    {email: args.email, password: args.password},
    {
      headers: {'Content-Type': 'application/json'}
    }
  )
  return signupRes
}

export const signin = async args => {
  try {
    const signupRes = await axios.post(
      `${BASE_URL}/auth/signin`,
      {email: args.email, password: args.password},
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
    if (signupRes.status === 200) {
      const loginRes = signupRes
      return loginRes
    }
  } catch (err) {
    console.log(err)
  }
}
