import { Suspense } from "react";

import { CardWrapper } from "@/app/auth/_components";
import { GoogleVerify } from "@/app/auth/google/_components";

const GooglePage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100">
            <CardWrapper
                headerLabel="Verification"
                headerDescription="Confirming your google"
                backButtonText="Back to login"
                backButtonAttribute="/auth/login"
            >
                <Suspense>
                    <GoogleVerify />
                </Suspense>
            </CardWrapper>
        </div>
    );
};

export default GooglePage;
