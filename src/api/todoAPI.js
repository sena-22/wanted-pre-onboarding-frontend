import axios from 'axios'
import {BASE_URL} from './const'
import {getTokenToLocalStorage} from '../utils/tokenHandler'

export const create_todo = async todo => {
  const access_token = getTokenToLocalStorage('access_token')
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
  const access_token = getTokenToLocalStorage('access_token')
  const get_todos_res = await axios.get(`${BASE_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  return get_todos_res.data
}

export const update_todo = async todo => {
  const access_token = getTokenToLocalStorage('access_token')
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
  return update_todo_res
}

export const delete_todo = async id => {
  const access_token = getTokenToLocalStorage('access_token')
  const delete_todo_res = await axios.delete(`${BASE_URL}/todos/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  })
  return delete_todo_res.data
}
