import React from 'react'
import {useState, useEffect} from 'react'
import {create_todo, get_todos} from '../api/todoAPI'

const Todo = () => {
  const [todoList, setTodoList] = useState([])
  const [inputTodo, setInputTodo] = useState('')

  useEffect(() => {
    get_todos()
      .then(todos => setTodoList(todos))
      .catch(err => console.error(err))
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    const newTodo = await create_todo(inputTodo)
    setTodoList(prev => [...prev, newTodo])
    setInputTodo('')
  }

  const handleChangeInputTodo = e => {
    setInputTodo(e.target.value)
  }

  const handleChecked = () => {}

  return (
    <>
      {/* 추가 */}
      <input
        data-testid="new-todo-input"
        type="text"
        onChange={handleChangeInputTodo}
        value={inputTodo}
      />
      <button data-testid="new-todo-add-button" onClick={createTodo}>
        추가
      </button>
      {/* 조회 */}
      {todoList.map(todo => (
        <div key={todo.id}>
          <li>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={handleChecked}
              />
              <span>{todo.todo}</span>
            </label>
          </li>
        </div>
      ))}
    </>
  )
}

export default Todo
