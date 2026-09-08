import { CgSpinner } from "react-icons/cg";

type AuthButtonProps = {
  text: string;
} & React.ComponentProps<"button">;

export default function AuthButton({ text, ...props }: AuthButtonProps) {
  return (
    <button
      {...props}
      className={`
        ${props.disabled ? "bg-zinc-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-800 cursor-pointer transition"}
         text-white rounded-sm mt-4 p-1 font-semibold h-12 text-xl lg:h-8 lg:text-base
      `}
    >
      {props.disabled ? (
        <p className="flex justify-center items-center gap-x-2">
          Aguarde{" "}
          <span className="animate-spin">
            <CgSpinner size={20} />
          </span>
        </p>
      ) : (
        text
      )}
    </button>
  );
}
