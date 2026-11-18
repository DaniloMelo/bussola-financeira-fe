import ActivateUserForm from "@/components/ActivateUserForm/page";
import { Suspense } from "react";

export default function ActivateUserPage() {
  return (
    <Suspense>
      <ActivateUserForm />
    </Suspense>
  );
}
