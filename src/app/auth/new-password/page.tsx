import React from "react";

import CardWrapper from "@/app/auth/_components/CardWrapper";
import { NewPasswordForm } from "@/app/auth/new-password/_components/NewPasswordForm";

const page = () => {
  return (
    <div className="from-neutral-000 flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-neutral-100">
      <CardWrapper
        headerLabel="Change Password"
        headerDescription="Don't share your password"
        backButtonText="Go back to login"
        backButtonAttribute="/auth/login"
      >
        <NewPasswordForm />
      </CardWrapper>
    </div>
  );
};

export default page;
