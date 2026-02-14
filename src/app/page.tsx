import LoginForm from "@/components/LoginForm";
import LoginFormSkeleton from "@/components/LoginForm/login-form-skeleton";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex h-screen justify-center items-center">
      <Suspense fallback={<LoginFormSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
