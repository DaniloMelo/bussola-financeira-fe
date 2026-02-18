import { requireAuthenticatedUser } from "@/lib/api-server";

export default async function DashBoard() {
  await requireAuthenticatedUser();

  return <h1>Página principal</h1>;
}
