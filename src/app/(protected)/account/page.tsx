import React, { Suspense } from "react";

import { Container } from "@/components";

import { AccountInfo } from "./_components/AccountInfo";
import { OrdersList } from "./_components/OrdersList";
import { AccountInfoSkeleton } from "./_components/Ui/skeletons/AccountInfoSkeleton";

const SettingsPage = async () => {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100 text-black">
            <Container className="grid pb-10 pt-10 lg:grid-cols-[1fr,365px] lg:gap-6">
                <OrdersList />
                <Suspense fallback={<AccountInfoSkeleton />}>
                    <AccountInfo />
                </Suspense>
            </Container>
        </div>
    );
};

export default SettingsPage;
