export default function MainContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="pl-18 pt-4">{children}</div>;
}
