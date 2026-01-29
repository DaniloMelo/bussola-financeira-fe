import { useId } from "react";

type InputTextProps = {
  type?: "text" | "password" | "email";
  labelText?: string;
} & React.ComponentProps<"input">;

export default function InputText({
  type,
  labelText,
  ...props
}: InputTextProps) {
  const id = useId();

  return (
    <div className="flex flex-col my-2">
      {labelText && (
        <label htmlFor={id} className="font-semibold text-sm">
          {" "}
          {labelText}
        </label>
      )}

      <input
        {...props}
        type={type}
        id={id}
        className="p-1 border rounded-sm outline-none border-zinc-500/50 focus:border-zinc-500"
      />
    </div>
  );
}
