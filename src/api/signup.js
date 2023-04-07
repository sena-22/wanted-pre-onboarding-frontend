import {BASE_URL} from './const'
import axios from 'axios'

export const signup = async args => {
  const signupRes = await axios.post(
    `${BASE_URL}/auth/signup`,
    {email: args.email, password: args.password},
    {
      Headers: {'Content-Type': 'application/json'}
    }
  )
  return signupRes
}
