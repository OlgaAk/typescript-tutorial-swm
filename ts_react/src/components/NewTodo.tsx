import React, { useRef } from "react";

interface NewTodoProps {
  onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
    textInputRef.current!.value = "";
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <input id="todoInput" type="text" ref={textInputRef} />
      <button type="submit">Add todo</button>
    </form>
  );
};

export default NewTodo;
