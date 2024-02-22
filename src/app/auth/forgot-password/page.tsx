import React, { Suspense } from "react";

import CardWrapper from "@/app/auth/_components/CardWrapper";
import { ForgotPasswordForm } from "@/app/auth/forgot-password/_components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="from-neutral-000 flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-neutral-100">
      <Suspense fallback={<p className="text-black">Loading...</p>}>
        <CardWrapper
          headerLabel="Enter your email"
          headerDescription="You will receive mail"
          backButtonText="Back to login"
          backButtonAttribute="/auth/login"
        >
          <ForgotPasswordForm />
        </CardWrapper>
      </Suspense>
    </div>
  );
};

export default ForgotPasswordPage;
