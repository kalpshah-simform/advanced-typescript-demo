import { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputForwardRef = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input type="text" ref={ref} {...props} />;
  },
);

export default InputForwardRef;
