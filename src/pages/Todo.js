import React from 'react'
import {useState, useEffect} from 'react'
import {create_todo} from '../api/todoAPI'

const Todo = () => {
  const [todoList, setTodoList] = useState([])
  const [inputTodo, setInputTodo] = useState('')

  // useEffect(() => {
  //   //TODO: 서버에서 todo 목록 받아오기, 없을 때도 고려하기

  // }, [])

  const createTodo = async e => {
    e.preventDefault()
    let newTodo = create_todo(inputTodo)
    setTodoList(prev => [...prev, newTodo])
  }

  const handleChangeInputTodo = e => {
    setInputTodo(e.target.value)
  }

  return (
    <>
      {/* 추가 */}
      <input data-testid="new-todo-input" type="text" onChange={handleChangeInputTodo} />
      <button data-testid="new-todo-add-button" onClick={createTodo}>
        추가
      </button>
      {/* 조회 */}
      {todoList.map(todo => (
        <div key={todo.id}>
          <li>
            <label>
              <input type="checkbox" checked={todo.isCompleted} />
              <span>{todo.todo}</span>
            </label>
          </li>
        </div>
      ))}
    </>
  )
}

export default Todo
