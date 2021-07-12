import React from "react";

import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const todos = [
    { id: "1", text: "Buy bread" },
    { id: "2", text: "Wash dishes" },
  ];
  return (
    <div className="App">
      <TodoList items={todos} />
    </div>
  );
};

export default App;
