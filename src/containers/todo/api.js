import axios from '../../utils/axios';

export const fetchTodos = () => {
  const url = "/todos";
  return axios.get(url).then(res => res.data); // {todos: [{...}]}
}

// export const fetchTodoByID = (id) => {
//   const url = `/todos/${id}`;
//   return axios.get(url).then(res => res.data);
// }

export const createTodo = (payload) => { // { text: "", completed: boolean, color: "" }
  const url = "/todos";
  return axios.post(url, {
    ...payload,
    completed: payload.completed ? 1 : 0,
  }).then(res => res.data); // { todo: {text: "", completed: boolean, color: "", id: 6 }}
}

export const updateTodo = (payload) => { // { text: "", completed: boolean, color: "", id: "6" }
  const { id, ...others } = payload;
  const url = `/todos/${id}`;
  return axios.put(url, {...others}).then(res => res.data); // { todo: {text: "", completed: boolean, color: "", id: 6 }}
}

export const deleteTodo = (id) => { // 6
  const url = `/todos/${id}`; // 6
  return axios.delete(url).then(res => res.data); 
}

export const UpdateCompletedTodos = (payload) => {
  console.log(payload);
  const response = Promise.all(
    payload.map((todo) => {
      return updateTodo({
        ...todo,
        completed: true,
      });
    })
  );

  return response;
};

export const ClearTodosCompleted = (payload) => {
  const response = Promise.all(
    payload.map((todo) => {
      return deleteTodo(todo.id);
    })
  );
  return response;
};