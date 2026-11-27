"use client";

import { useAuth } from "@/hooks/use-auth";
import { LuLogOut } from "react-icons/lu";

export default function LogoutButton() {
  const { isLoading, logoutUser } = useAuth();

  return (
    <button
      onClick={() => void logoutUser()}
      disabled={isLoading}
      className="py-2 px-4 "
    >
      {isLoading ? (
        "Aguade..."
      ) : (
        <div className="flex justify-center items-center gap-x-2 py-2 px-4 cursor-pointer">
          <span className="text-lg">Sair</span> <LuLogOut />
        </div>
      )}
    </button>
  );
}
