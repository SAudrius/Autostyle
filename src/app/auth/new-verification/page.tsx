import React from "react";

import CardWrapper from "@/app/auth/_components/CardWrapper";
import { NewVerificationForm } from "@/app/auth/new-verification/_components/NewVerificationForm";

const NewVerificationPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100">
      <CardWrapper
        headerLabel="Verification"
        headerDescription="Confirming your mail"
        backButtonText="Back to login"
        backButtonAttribute="/auth/login"
      >
        <NewVerificationForm />
      </CardWrapper>
    </div>
  );
};

export default NewVerificationPage;
