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
    <div className="flex items-center justify-center w-screen h-screen font-mono text-zinc-100">
      <div className="flex flex-col items-center w-2/6 bg-lime-900 rounded-xl h-5/6">
        <h1 className="mt-10 text-3xl text-orange-500">Todo List</h1>
        {/* 추가 */}
        <div className="flex w-4/6 h-10 mt-10 mb-5">
          <input
            data-testid="new-todo-input"
            type="text"
            onChange={handleChangeInputTodo}
            value={inputTodo}
            className="w-5/6 px-3 py-3 mr-5 text-orange-900 rounded"
          />
          <button
            data-testid="new-todo-add-button"
            onClick={createTodo}
            className="w-32 bg-orange-400 rounded ">
            create
          </button>
        </div>
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
      </div>
    </div>
  )
}

export default Todo
