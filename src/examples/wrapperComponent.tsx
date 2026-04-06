import React from "react";

export default function wrapComponent<T>(
  Component: React.ComponentType<T>,
): React.FC<T & { wrapperClassname?: string }> {
  return (props) => (
    <div className={props.wrapperClassname}>
      <Component {...props} />
    </div>
  );
}
