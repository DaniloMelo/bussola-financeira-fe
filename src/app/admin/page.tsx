// import { requireAdminRole } from "@/lib/api-server";
import Link from "next/link";

export default function AdminPanel() {
  // const user = await requireAdminRole();

  return (
    <>
      <h1>Painel Administrativo</h1>

      <Link href="admin/application-settings/upstash-update">Upstash</Link>

      {/* <p>nome: {user.name}</p>
      <p>nome: {user.email}</p> */}
    </>
  );
}
