import { Role } from "@/enums/role";
import { requireAuthenticatedUser } from "@/lib/api-server";
import Link from "next/link";

export default async function Profile() {
  const user = await requireAuthenticatedUser();
  const isAdmin = user.roles.map((role) => role.name).includes(Role.ADMIN);

  return (
    <div>
      <h1>Página de perfil</h1>

      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>

      {isAdmin && <Link href="/admin">Painel Administrativo</Link>}
    </div>
  );
}
