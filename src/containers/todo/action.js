import { fetchTodos, createTodo, updateTodo, deleteTodo, UpdateCompletedTodos, ClearTodosCompleted } from './api';

export const todoAdded = (todo) => ({ type: 'todos/todoAdded', payload: todo })

export const todoToggled = (todoId) => ({
  type: 'todos/todoToggled',
  payload: todoId,
})

export const todoColorSelected = (todoId, color) => ({
  type: 'todos/colorSelected',
  payload: { todoId, color },
})

export const todoDeleted = (todoId) => ({
  type: 'todos/todoDeleted',
  payload: todoId,
})

export const todoUpdated = (payload) => ({
  type: 'todos/todoUpdated',
  payload: payload,
})

export const allTodosCompleted = (payload) => ({
  type: "todos/allCompleted",
  payload: payload,
});

export const completedTodosCleared = () => ({ type: 'todos/completedCleared' })

export const todosLoading = () => ({ type: 'todos/todosLoading' })

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
})

// Thunk functions
export const handleFetchTodos = () => async (dispatch) => {
  dispatch(todosLoading())
  const response = await fetchTodos()
  dispatch(todosLoaded(response?.todos.map(item => ({
      ...item,
      completed: !!item.completed,
    })
  ) || []))
}

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text }
    const response = await createTodo({ ...initialTodo, completed: false })
    dispatch(
      todoAdded({
        ...response.todo,
        completed: !!response.todo.completed,
      })
    )
  }
}

export function updateOldTodo(payload) {
  return async function(dispatch, getState) {
    const response = await updateTodo(payload)
    dispatch(
      todoUpdated({
        ...response.todo,
        completed: !!response.todo.completed,
      })
    )
  }
}

export function removeTodo(id) {
  return async function (dispatch, getState) {
    const response = await deleteTodo(id)
    dispatch(todoDeleted(response.todo))
  }
}

// export function handleAllTodosCompleted(payload) {
//   return async function (dispatch, getState) {
//     const response = await updateTodo(payload)
//     dispatch(allTodosCompleted())
//   }
// }

export function allCompletedTodos() {
  return async function (dispatch, getState) {
    const { todos } = getState();
    const response = await UpdateCompletedTodos(
      todos.entities.filter((todo) => {
        return !todo.completed;
      })
    );
    console.log({
      ...response.todo,
      completed: true,
    });
    dispatch(
      allTodosCompleted({
        ...response.todo,
        completed: true,
      })
    );
  };
}

export function completedClearedTodos() {
  return async function (dispatch, getState) {
    const { todos } = getState();
    const response = await ClearTodosCompleted(
      todos.entities.filter((item) => {
        return item.completed;
      })
    );
    console.log(response);
    dispatch(completedTodosCleared());
  };
}