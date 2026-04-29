import { useId, useState } from "react";
import { LuEye, LuEyeClosed } from "react-icons/lu";

type InputTextProps = {
  type?: "text" | "password" | "email";
  labelText?: string;
} & React.ComponentProps<"input">;

export default function Input({ type, labelText, ...props }: InputTextProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === "password";

  const id = useId();

  return (
    <div className="flex flex-col my-2">
      {labelText && (
        <label htmlFor={id} className="font-semibold text-sm">
          {" "}
          {labelText}
        </label>
      )}

      <div
        className="
          flex pr-2 border rounded-sm 
          bg-secondary-background dark:bg-secondary-background 
          border-secondary-border focus-within:border-primary-border dark:border-secondary-border dark:focus-within:border-primary-border
        "
      >
        <input
          {...props}
          type={showPassword === true ? "text" : type}
          id={id}
          className="
            w-full p-1 outline-none [&::-ms-reveal]:hidden [&::-ms-clear]:hidden 
            placeholder:text-muted-text dark:placeholder:text-muted-text text-primary-text dark:text-primary-text
          "
        />
        {isPasswordInput && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="cursor-pointer"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword === true ? <LuEye /> : <LuEyeClosed />}
          </button>
        )}
      </div>
    </div>
  );
}
