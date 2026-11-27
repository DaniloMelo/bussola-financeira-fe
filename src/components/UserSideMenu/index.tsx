import SideMenu from "../SideMenu";

export default function UserSideMenu() {
  const links = [
    {
      itemName: "Início",
      links: [
        {
          linkName: "Dashboard",
          linkHref: "/dashboard",
        },
      ],
    },
    {
      itemName: "Meu perfil",
      links: [
        {
          linkName: "Alterar dados cadastrais",
          linkHref: "/user/profile",
        },
      ],
    },
  ];

  return <SideMenu sideMenuItems={links} />;
}
