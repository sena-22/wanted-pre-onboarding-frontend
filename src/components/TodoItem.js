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
    <div key={todo.id}>
      <li>
        <label>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => handleChecked(todo.id)}
          />
          <span>{todo.todo}</span>
        </label>
        {isEditMode[todo.id] ? (
          <>
            <input
              data-testid="modify-input"
              value={editTodo}
              onChange={handleChangeEditTodo}
            />
            <button
              data-testid="submit-button"
              onClick={() => updateTodo(todo.id, editTodo)}>
              제출
            </button>
            <button
              data-testid="cancel-button"
              onClick={() => handleCancleEditMode(todo.id)}>
              취소
            </button>
          </>
        ) : (
          <>
            <button data-testid="modify-button" onClick={() => handleEditMode(todo.id)}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => deleteTodo(todo.id)}>
              삭제
            </button>
          </>
        )}
      </li>
    </div>
  )
}

export default TodoItem
