import React from "react";

import { Container } from "@/components/ui/custom/Container";

import { AccountInfo } from "./_components/AccountInfo";
import { OrdersList } from "./_components/OrdersList";

const SettingsPage = async () => {
  async function handleSingout() {
    "use server";
    console.log("TODO: handle singout");
  }

  return (
    <div className="from-neutral-000 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] to-neutral-100 text-black">
      <Container className="grid pb-10 pt-10">
        <OrdersList />
        <AccountInfo />
      </Container>
    </div>
  );
};

export default SettingsPage;
