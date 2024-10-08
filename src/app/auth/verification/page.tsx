import React, { Suspense } from "react";

import { CardWrapper } from "@/app/auth/_components";
import { NewVerificationForm } from "@/app/auth/verification/_components";
import { GlobalLoading } from "@/components";

const VerificationPage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100">
            <CardWrapper
                headerLabel="Verification"
                headerDescription="Confirming your mail"
                backButtonText="Back to login"
                backButtonAttribute="/auth/login"
            >
                <Suspense fallback={<GlobalLoading/>}><NewVerificationForm /></Suspense>
            </CardWrapper>
        </div>
    );
};

export default VerificationPage;
