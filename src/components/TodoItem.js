import React from 'react'
import {useState} from 'react'

const TodoItem = ({
  todo,
  handleChecked,
  deleteTodo,
  isEditMode,
  handleEditMode,
  updateTodo
}) => {
  const [editTodo, setEditTodo] = useState(todo.todo)

  const handleChangeEditTodo = e => {
    setEditTodo(e.target.value)
  }

  const handleCancleEditMode = id => {
    handleEditMode(todo.id)
    setEditTodo(todo.todo)
  }

  return (
    <div className="flex justify-between w-4/6 h-10 mt-4 text-base ">
      <li>
        <label>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleChecked(todo.id)}
            className="mr-2"
          />
          <span className="mr-2">{todo.todo}</span>
        </label>
        {isEditMode[todo.id] ? (
          <>
            <input
              data-testid="modify-input"
              value={editTodo}
              onChange={handleChangeEditTodo}
              className="w-2/6 max-w-xs px-1 py-1 mr-2 text-orange-900 rounded "
            />
            <button
              data-testid="submit-button"
              onClick={() => updateTodo(todo.id, editTodo)}
              className="mr-2">
              edit
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => handleCancleEditMode(todo.id)}>
              cancel
            </button>
          </>
        ) : (
          <>
            <button
              data-testid="modify-button"
              onClick={() => handleEditMode(todo.id)}
              className="mr-2">
              edit
            </button>
            <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>
              delete
            </button>
          </>
        )}
      </li>
    </div>
  )
}

export default TodoItem
