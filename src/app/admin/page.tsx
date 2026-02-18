import { requireAdminRole } from "@/lib/api-server";

export default async function AdminPanel() {
  const user = await requireAdminRole();

  return (
    <>
      <h1>Painel Administrativo</h1>

      <p>nome: {user.name}</p>
      <p>nome: {user.email}</p>
    </>
  );
}
