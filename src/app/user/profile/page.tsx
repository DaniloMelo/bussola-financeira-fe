import Container from "@/components/Container";
import Header from "@/components/Header";
import MainContentWrapper from "@/components/MainContentWrapper";
import UserSideMenu from "@/components/UserSideMenu";
import { Role } from "@/enums/role";
import { requireAuthenticatedUser } from "@/lib/api-server";
import Link from "next/link";

export default async function Profile() {
  const user = await requireAuthenticatedUser();
  const isAdmin = user.roles.map((role) => role.name).includes(Role.ADMIN);

  return (
    <Container className="pl-0 lg:pl-0 py-0 lg:py-0">
      <Header />

      <UserSideMenu />

      <MainContentWrapper>
        <h1>Página de perfil</h1>

        <p>Nome: {user.name}</p>
        <p>Email: {user.email}</p>

        {isAdmin && <Link href="/admin">Painel Administrativo</Link>}
      </MainContentWrapper>
    </Container>
  );
}
