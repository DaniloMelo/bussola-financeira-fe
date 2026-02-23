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
        <div className="flex justify-center items-center gap-x-2">
          Sair <LuLogOut />
        </div>
      )}
    </button>
  );
}
