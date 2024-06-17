import React, { Suspense } from "react";

import { Container } from "@/components/ui/custom";

import { AccountInfo } from "./_components/AccountInfo";
import { OrdersList } from "./_components/OrdersList";
import { AccountInfoSkeleton } from "./_components/Ui/skeletons/AccountInfoSkeleton";

const SettingsPage = async () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100 text-black">
      <Container className="grid pb-10 pt-10">
        <OrdersList />
        <Suspense fallback={<AccountInfoSkeleton />}>
          <AccountInfo />
        </Suspense>
      </Container>
    </div>
  );
};

export default SettingsPage;
