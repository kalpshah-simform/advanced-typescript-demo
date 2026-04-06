import useCounter from "../hooks/useCounter";

export default function CounterComponent({
  children,
}: Readonly<{ children: (value: number) => React.ReactNode }>) {
  const { count, increment, decrement, reset } = useCounter();
  console.log("CounterComponent context:", {
    count,
    increment,
    decrement,
    reset,
  });
  return (
    <div>
      {children(count)}
      <div className="button-wrapper">
        <button onClick={() => increment()}>+</button>
        <button onClick={() => decrement()}>-</button>
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
}
