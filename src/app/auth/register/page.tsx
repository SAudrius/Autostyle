import React from "react";

import CardWrapper from "@/app/auth/_components/CardWrapper";
import { RegisterForm } from "@/app/auth/register/_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="border-box from-neutral-000 flex w-full items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-neutral-100 py-20">
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
