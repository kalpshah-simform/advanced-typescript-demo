import { useContext } from "react";
import CounterContext, {
  type CounterContextValue,
} from "../contexts/counterContext";

export default function useCounter(): CounterContextValue {
  const context = useContext(CounterContext);

  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }

  return context;
}
