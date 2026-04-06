import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodosComponent from "./examples/todosComponent";
import APIFetchComponent from "./examples/APIFetchComponent";
import wrapComponent from "./examples/wrapperComponent";

const WrappedTodosComponent = wrapComponent(TodosComponent);
const WrappedAPIFetchComponent = wrapComponent(APIFetchComponent);

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <WrappedTodosComponent key="todos" wrapperClassname="card" />
      <WrappedAPIFetchComponent key="API" wrapperClassname="card" />

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
