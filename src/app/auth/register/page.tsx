import React from "react";

import { CardWrapper } from "@/app/auth/_components";
import { RegisterForm } from "@/app/auth/register/_components";

const RegisterPage = () => {
  return (
    <div className="border-box flex w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100 py-20">
      <CardWrapper
        headerLabel="Register"
        headerDescription="Create your account"
        backButtonText="Have an account?"
        backButtonAttribute="/auth/login"
      >
        <RegisterForm />
      </CardWrapper>
    </div>
  );
};

export default RegisterPage;
