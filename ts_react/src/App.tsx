import React, { useState } from "react";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  function addTodoHandler(text: string) {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Math.random().toString(), text: text },
    ]);
  }

  function deleteTodoHandler(id: string) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodoHandler} />
      <TodoList items={todos} onDeleteTodo={deleteTodoHandler} />
    </div>
  );
};

export default App;
