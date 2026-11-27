"use client";

import { useAuth } from "@/hooks/use-auth";
import { LuLogOut } from "react-icons/lu";

export default function LogoutButton() {
  const { isLoading, logoutUser } = useAuth();

  return (
    <button
      onClick={() => void logoutUser()}
      disabled={isLoading}
      className="
        cursor-pointer px-4 py-2 text-xl transition-colors duration-200
        text-zinc-600 dark:text-zinc-400"
    >
      {isLoading ? (
        <span>Aguarde...</span>
      ) : (
        <div className="flex items-center gap-2 hover:text-zinc-900 dark:hover:text-zinc-200">
          <span>Sair</span>
          <LuLogOut />
        </div>
      )}
    </button>
  );
}
