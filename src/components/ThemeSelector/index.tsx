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
      <button
        className="h-10 w-10 rounded-lg bg-muted/20"
        aria-label="Carregando tema"
      />
    );
  }

  return (
    <div className="flex w-fit gap-1 rounded-lg bg-card p-1">
      {themes.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;

        return (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium
              transition-colors
              ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted hover:bg-border hover:text-foreground"
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
