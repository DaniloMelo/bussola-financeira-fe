export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="mx-auto w-full max-w-7xl p-6 lg:p-4">{children}</div>;
}
