import clsx from "clsx";

function Button({ className, ...rest }: JSX.IntrinsicElements["button"]) {
  return (
    <button
      className={clsx(className, "p-2 border border-blue-600")}
      {...rest}
    />
  );
}

export { Button };
