import React from "react";

import { Todo } from "../todo.model";

interface TodoProps {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoProps> = (props) => {
  return (
    <li key={props.todo.id}>
      {props.todo.text}{" "}
      <button onClick={() => props.onDeleteTodo(props.todo.id)}>delete</button>
    </li>
  );
};

export default TodoItem;
