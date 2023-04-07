import axios from 'axios'
import {BASE_URL} from './const'
import {getTokenToLocalStorage} from '../utils/tokenHandler'

const access_token = getTokenToLocalStorage('access_token')

export const create_todo = async todo => {
  const create_todoRes = await axios.post(
    `${BASE_URL}/todos`,
    {todo},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }
  )
  return create_todoRes.data
}
