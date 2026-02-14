import Wait from "../AuthButton/Wait";
import AuthLayout from "../AuthLayout";

export default function LoginFormSkeleton() {
  return (
    <AuthLayout title="Aguarde..." description="">
      <div className="flex flex-col">
        <div className="flex pr-2 border rounded-sm border-zinc-500/50 focus-within:border-zinc-600 mb-8 mt-10 animate-pulse">
          <input disabled={true} className="p-1" />
        </div>

        <div className="flex pr-2 border rounded-sm border-zinc-500/50 focus-within:border-zinc-600 mb-2 animate-pulse">
          <input disabled={true} className="p-1" />
        </div>

        <button className="bg-zinc-500 cursor-not-allowed text-white rounded-sm mt-4 p-1 font-semibold animate-pulse">
          <Wait />
        </button>
      </div>
    </AuthLayout>
  );
}
