import { Role } from "@/enums/role";
import { requireAuthenticatedUser } from "@/lib/api-server";
import Link from "next/link";

export default async function AdminPageLink() {
  const user = await requireAuthenticatedUser();
  const isAdmin = user.roles.map((role) => role.name).includes(Role.ADMIN);

  return (
    isAdmin && (
      <Link href="/admin" className="py-2 px-4 text-lg font-medium">
        Painel administrativo
      </Link>
    )
  );
}
