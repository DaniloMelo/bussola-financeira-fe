import SideMenu from "@/components/SideMenu";
import AdminPageLink from "../AdminPageLink";

export default function AdminSideMenu() {
  const links = [
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
  ];

  return (
    <SideMenu sideMenuItems={links}>
      <AdminPageLink />
    </SideMenu>
  );
}
