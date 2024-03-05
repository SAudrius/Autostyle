import React from "react";

import { CardWrapper } from "@/app/auth/_components";
import { LoginForm } from "@/app/auth/login/_components";

const LoginPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100">
      <CardWrapper
        headerLabel="Login"
        headerDescription="Welcome back"
        backButtonText="Need an account?"
        backButtonAttribute="/auth/register"
      >
        <LoginForm />
      </CardWrapper>
    </div>
  );
};

export default LoginPage;
