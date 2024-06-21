import React, { Suspense } from "react";

import { CardWrapper } from "../_components";
import { ResetPasswordForm } from "./_components";

const ChangePassword = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100">
      <CardWrapper
        headerLabel="Reset password"
        headerDescription="Create new password"
        backButtonText="Back to login"
        backButtonAttribute="/auth/login"
      >
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </CardWrapper>
    </div>
  );
};

export default ChangePassword;
