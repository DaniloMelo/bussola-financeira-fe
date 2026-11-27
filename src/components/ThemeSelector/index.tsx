"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuSun, LuMoon } from "react-icons/lu";
import { IoIosPhonePortrait } from "react-icons/io";

const themes = [
  { value: "light", label: "Claro", icon: LuSun },
  { value: "dark", label: "Escuro", icon: LuMoon },
  { value: "system", label: "Sistema", icon: IoIosPhonePortrait },
] as const;

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-10 rounded-full border-4 border-zinc-950/20 border-t-blue-500 animate-spin"
        aria-label="Carregando tema"
      />
    );
  }

  return (
    <div className="flex w-fit gap-1 rounded-full bg-zinc-500/30 p-1">
      {themes.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              flex items-center gap-2 rounded-full px-4 py-2 text-sm cursor-pointer
              transition-colors
              ${
                isActive
                  ? "bg-blue-500 text-white font-medium"
                  : "text-white bg-zinc-500/50 hover:bg-zinc-500/80 transition"
              }
            `}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
