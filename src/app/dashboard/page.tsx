import Container from "@/components/Container";
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import SideMenu from "@/components/SideMenu";
import { requireAuthenticatedUser } from "@/lib/api-server";

export default async function DashBoard() {
  await requireAuthenticatedUser();

  return (
    <>
      <Header />
      <Container className="pl-0 lg:pl-0 py-0 lg:py-0">
        <div className="flex">
          <SideMenu
            sideMenuItems={[
              {
                itemName: "Perfil",
                links: [{ linkName: "Meu perfil", linkHref: "/user/profile" }],
              },
            ]}
          />

          <MainContentWrapper>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            laboriosam neque voluptas asperiores quae dignissimos accusantium
            consequatur magnam, tempora dolor, doloremque totam facilis
            quibusdam quas numquam, unde aspernatur minus ipsum!
          </MainContentWrapper>
        </div>
      </Container>
    </>
  );
}
