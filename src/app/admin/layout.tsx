import Container from "@/components/Container";
import { requireAdminRole } from "@/lib/api-server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdminRole();

  return (
    <>
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
