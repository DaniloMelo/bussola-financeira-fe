import Container from "@/components/Container";
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import UserSideMenu from "@/components/UserSideMenu";
import { requireAuthenticatedUser } from "@/lib/api-server";

export default async function Profile() {
  const user = await requireAuthenticatedUser();

  return (
    <>
      <Header />
      <Container className="pl-0 lg:pl-0 py-0 lg:py-0">
        <UserSideMenu />

        <MainContentWrapper>
          <h1>Página de perfil</h1>

          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </MainContentWrapper>
      </Container>
    </>
  );
}
