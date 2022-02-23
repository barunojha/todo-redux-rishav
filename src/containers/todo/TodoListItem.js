import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ReactComponent as TimesSolid } from './times-solid.svg'

import { capitalize } from '../../utils';
import { availableColors } from '../filter/contants'
import { selectTodoById } from './reducer';
import {
  todoColorSelected,
  todoToggled,
  todoDeleted,
  removeTodo,
  updateOldTodo,
} from './action'

// Destructure `props.id`, since we just need the ID value
const TodoListItem = ({ id }) => {
  // Call our `selectTodoById` with the state _and_ the ID value
  const todo = useSelector((state) => selectTodoById(state, id))
  const { text, completed, color } = todo

  const dispatch = useDispatch()

  const handleCompletedChanged = () => {
    // dispatch(todoToggled(todo.id))
    dispatch(
      updateOldTodo({
        ...todo,
        completed: !todo.completed,
      })
    )
  }

  const handleColorChanged = (e) => {
    const color = e.target.value
    // dispatch(todoColorSelected(todo.id, color))
    dispatch(updateOldTodo({
      ...todo,
      color,
    }))
  }

  const onDelete = () => {
    // dispatch(todoDeleted(todo.id))
    dispatch(removeTodo(todo.id))
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
