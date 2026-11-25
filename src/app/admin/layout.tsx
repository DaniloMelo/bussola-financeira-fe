import Container from "@/components/Container";
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import SideMenu from "@/components/SideMenu";
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

        <SideMenu
          sideMenuItems={[
            {
              itemName: "Configurações da app",
              links: [
                {
                  linkName: "Contador Upstash",
                  linkHref: "/admin/application-settings/upstash-update",
                },
              ],
            },
            {
              itemName: "Usuários",
              links: [
                {
                  linkName: "Gerenciar Usuários",
                  linkHref: "",
                },
              ],
            },
            {
              itemName: "Voltar",
              links: [
                {
                  linkName: "Painel administrativo",
                  linkHref: "/admin",
                },
                {
                  linkName: "Dashboard",
                  linkHref: "/dashboard",
                },
                {
                  linkName: "Perfil",
                  linkHref: "/user/profile",
                },
              ],
            },
          ]}
        />

        <MainContentWrapper>{children}</MainContentWrapper>
      </Container>
    </>
  );
}
