import React from "react";

import { Container } from "@/components/ui/custom";

import { AccountInfo } from "./_components/AccountInfo";
import { OrdersList } from "./_components/OrdersList";

const SettingsPage = async () => {
  // eslint-disable-next-line no-unused-vars
  async function handleSingout() {
    "use server";
    console.log("TODO: handle singout");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-000 to-neutral-100 text-black">
      <Container className="grid pb-10 pt-10">
        <OrdersList />
        <AccountInfo />
      </Container>
    </div>
  );
};

export default SettingsPage;
