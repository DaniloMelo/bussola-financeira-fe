type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  variant: "primary" | "secondary";
  onClick: () => void;
};

export default function ButtonTemp({
  children,
  variant,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded ${variant === "primary" ? "bg-blue-800" : "bg-zinc-600"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
