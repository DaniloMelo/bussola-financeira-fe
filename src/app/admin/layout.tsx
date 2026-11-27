import AdminSideMenu from "@/components/admin/AdminSideMenu";
import Container from "@/components/Container";
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import { requireAdminRole } from "@/lib/api-server";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAdminRole();

  return (
    <>
      <Container className="pl-0 lg:pl-0 py-0 lg:py-0">
        <Header />

        <AdminSideMenu />

        <MainContentWrapper>{children}</MainContentWrapper>
      </Container>
    </>
  );
}
