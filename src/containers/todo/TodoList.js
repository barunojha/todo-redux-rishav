import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoListItem from './TodoListItem'

import { selectFilteredTodoIds } from './reducer'
import { handleFetchTodos } from './action';

const TodoList = () => {
  const dispatch = useDispatch();
  const todoIds = useSelector(selectFilteredTodoIds)
  const loadingStatus = useSelector((state) => state.todos.status)

  useEffect(() => {
    dispatch(handleFetchTodos());
  }, []);

  if (loadingStatus === 'loading') {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
