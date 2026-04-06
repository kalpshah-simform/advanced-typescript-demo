import { useAppDispatch } from "../redux/redux-store";
import { todoDeleted, todoToggled } from "../redux/todos/todosSlice";

interface TodoProps {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo({ id, text, completed }: Readonly<TodoProps>) {
  const dispatch = useAppDispatch();
  const handleToggleTodo = (id: number) => {
    dispatch(todoToggled(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(todoDeleted(id));
  };
  return (
    <div key={id} className="todo-item">
      <div className="todo-left">
        <input
          id={`todo-${id}`}
          type="checkbox"
          className="todo-checkbox"
          checked={completed}
          onChange={() => handleToggleTodo(id)}
        />
        <label htmlFor={`todo-${id}`}>
          <span className={`todo-text ${completed ? "completed" : ""}`}>
            {text}
          </span>
        </label>
      </div>

      <button
        type="button"
        className="todo-delete"
        onClick={() => handleDeleteTodo(id)}
      >
        Delete
      </button>
    </div>
  );
}
