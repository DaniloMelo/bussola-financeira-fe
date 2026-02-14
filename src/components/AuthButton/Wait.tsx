import { CgSpinner } from "react-icons/cg";

export default function Wait() {
  return (
    <p className="flex justify-center items-center gap-x-2">
      Aguarde{" "}
      <span className="animate-spin">
        <CgSpinner size={20} />
      </span>
    </p>
  );
}
