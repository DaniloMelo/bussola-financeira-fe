import { twMerge } from "tailwind-merge";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={twMerge("mx-auto w-full max-w-8xl p-6 lg:p-4", className)}>
      {children}
    </div>
  );
}
