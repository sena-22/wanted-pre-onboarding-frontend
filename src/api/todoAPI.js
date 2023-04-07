import axios from 'axios'
import {BASE_URL} from './const'
import {getTokenToLocalStorage} from '../utils/tokenHandler'

const access_token = getTokenToLocalStorage('access_token')

export const create_todo = async todo => {
  const create_todo_res = await axios.post(
    `${BASE_URL}/todos`,
    {todo},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }
  )
  return create_todo_res.data
}

export const get_todos = async () => {
  const get_todos_res = await axios.get(`${BASE_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  return get_todos_res.data
}

export const update_todo = async todo => {
  const update_todo_res = await axios.put(
    `${BASE_URL}/todos/${todo.id}`,
    {todo: todo.todo, isCompleted: todo.isCompleted},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`
      }
    }
  )
  return update_todo_res.data
}
