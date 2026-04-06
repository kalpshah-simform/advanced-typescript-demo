import { useRef } from "react";
import InputForwardRef from "./InputForwardRef";
import CounterComponent from "./CounterComponent";

export default function TypescriptExampleComponent() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <>
      <div className="todo-container">
        <InputForwardRef
          ref={inputRef}
          className="todo-input"
          placeholder="This is an input with forwarded ref"
        />
        <button
          className="todo-button"
          onClick={() => {
            if (inputRef.current) {
              console.log("Input value:", inputRef.current.value);
            }
          }}
        >
          Log input value
        </button>
      </div>
      <CounterComponent>
        {(count: number) => <h2>Counter: {count}</h2>}
      </CounterComponent>
    </>
  );
}
