import ResetPasswordPublicForm from "@/components/resetPasswordPublicForm";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordPublicForm />
    </Suspense>
  );
}
