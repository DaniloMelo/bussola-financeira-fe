import { CgSpinner } from "react-icons/cg";

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

function Wait() {
  return (
    <p className="flex justify-center items-center gap-x-2">
      Aguarde{" "}
      <span className="animate-spin">
        <CgSpinner size={20} />
      </span>
    </p>
  );
}
