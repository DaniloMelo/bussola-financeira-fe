import ResetPasswordPublicForm from "@/components/ResetPasswordPublicForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordPublicForm />
    </Suspense>
  );
}
