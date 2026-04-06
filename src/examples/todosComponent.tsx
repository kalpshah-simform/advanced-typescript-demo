import { useState } from "react";
import type { SubmitEvent } from "react";
import { useAppDispatch, useAppSelector } from "../redux/redux-store";
import { todoAdded } from "../redux/todos/todosSlice";
import Todo from "./Todo";

export default function TodosComponent() {
  const todos = useAppSelector((state) => state.todos);
  const [todoText, setTodoText] = useState("");
  const dispatch = useAppDispatch();

  const handleAddTodo = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedText = todoText.trim();

    if (!trimmedText) {
      return;
    }

    dispatch(
      todoAdded({
        id: Date.now(),
        text: trimmedText,
      }),
    );

    setTodoText("");
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-title">TodosComponent</div>

      <form className="todo-container" onSubmit={handleAddTodo}>
        <input
          type="text"
          value={todoText}
          className="todo-input"
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="Enter a todo"
        />
        <button type="submit" className="todo-button">
          Add Todo
        </button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            completed={todo.completed}
            text={todo.text}
          />
        ))}
      </div>
    </div>
  );
}
