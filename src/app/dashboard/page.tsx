import { requireAuthenticatedUser } from "@/lib/api-server";
import Link from "next/link";

export default async function DashBoard() {
  await requireAuthenticatedUser();

  return (
    <>
      <h1>Página principal</h1>

      <Link href="/user/profile">Perfil</Link>
    </>
  );
}
