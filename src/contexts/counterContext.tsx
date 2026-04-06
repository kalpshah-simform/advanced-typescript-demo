import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

type CounterState = {
  count: number;
};

type CounterAction =
  | { type: "INCREMENT"; payload?: number }
  | { type: "DECREMENT"; payload?: number }
  | { type: "RESET" }
  | { type: "SET"; payload: number };

export type CounterContextValue = {
  count: number;
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  reset: () => void;
  setCount: (value: number) => void;
};

type CounterProviderProps = {
  children: ReactNode;
  initialCount?: number;
};

const CounterContext = createContext<CounterContextValue | undefined>(
  undefined,
);

function assertNever(x: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(x)}`);
}

function counterReducer(
  state: CounterState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + (action.payload ?? 1) };

    case "DECREMENT":
      if (state.count === 0) {
        return state; // Prevent count from going below 0
      }
      return { count: state.count - (action.payload ?? 1) };

    case "RESET":
      return { count: 0 };

    case "SET":
      return { count: action.payload };

    default:
      return assertNever(action);
  }
}

export function CounterProvider({
  children,
  initialCount = 0,
}: Readonly<CounterProviderProps>) {
  const [state, dispatch] = useReducer(counterReducer, { count: initialCount });

  const increment = useCallback((step = 1) => {
    dispatch({ type: "INCREMENT", payload: step });
  }, []);

  const decrement = useCallback((step = 1) => {
    dispatch({ type: "DECREMENT", payload: step });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  const setCount = useCallback((value: number) => {
    dispatch({ type: "SET", payload: value });
  }, []);

  const value = useMemo<CounterContextValue>(
    () => ({
      count: state.count,
      increment,
      decrement,
      reset,
      setCount,
    }),
    [state.count, increment, decrement, reset, setCount],
  );

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
}

export default CounterContext;
