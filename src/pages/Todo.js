import React from 'react'
import {useState, useEffect} from 'react'

import TodoItem from '../components/TodoItem'
import {create_todo, get_todos, update_todo, delete_todo} from '../api/todoAPI'

const Todo = () => {
  const [todoList, setTodoList] = useState([])
  const [inputTodo, setInputTodo] = useState('')
  const [isEditMode, setIsEditMode] = useState([])

  const handleEditMode = id => {
    setIsEditMode(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  useEffect(() => {
    get_todos()
      .then(todos => {
        const editObj = {}
        todos.forEach(todo => {
          editObj[todo.id] = false
        })
        setTodoList(todos)
        setIsEditMode(editObj)
      })
      .catch(err => console.error(err))
  }, [])

  const createTodo = async e => {
    e.preventDefault()
    const newTodo = await create_todo(inputTodo)
    setTodoList(prev => [...prev, {...newTodo, editMode: false}])
    setInputTodo('')
  }

  const deleteTodo = id => {
    delete_todo(id)
      .then(() => setTodoList(prev => prev.filter(todo => todo.id !== id)))
      .catch(err => console.error(err))
  }

  const handleChangeInputTodo = e => {
    setInputTodo(e.target.value)
  }

  const handleChecked = async id => {
    const updateTodo = todoList.find(todo => todo.id === id)
    updateTodo.isCompleted = !updateTodo.isCompleted
    await update_todo(updateTodo)
    const updateTodoList = await get_todos()

    setTodoList(updateTodoList)
  }

  const updateTodo = async (id, todo) => {
    const updateTodo = todoList.find(todo => todo.id === id)
    updateTodo.todo = todo
    await update_todo(updateTodo)
    const updateTodoList = await get_todos()

    setTodoList(updateTodoList)
    handleEditMode(updateTodo.id)
  }

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
      {/* 조회.수정.삭제 */}
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleChecked={handleChecked}
          isEditMode={isEditMode}
          handleEditMode={handleEditMode}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </>
  )
}

export default Todo
