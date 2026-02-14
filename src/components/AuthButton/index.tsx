import Wait from "./Wait";

type AuthButtonProps = {
  text: string;
} & React.ComponentProps<"button">;

export default function AuthButton({ text, ...props }: AuthButtonProps) {
  return (
    <button
      {...props}
      className={`
        ${props.disabled ? "bg-zinc-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-800 cursor-pointer"}
         text-white rounded-sm mt-4 p-1 font-semibold
      `}
    >
      {props.disabled ? <Wait /> : text}
    </button>
  );
}
