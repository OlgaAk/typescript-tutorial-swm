import React from "react";

import TodoItem from "./TodoItem";

interface TodoListProps {
  items: { id: string; text: string }[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = (props) => {
  return (
    <ul>
      {props.items.map((todo) => (
        <TodoItem todo={todo} onDeleteTodo={props.onDeleteTodo} />
      ))}
    </ul>
  );
};

export default TodoList;
