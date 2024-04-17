import React from "react";

import { EmptyOrders } from "@/app/(protected)/account/_components/Ui/EmptyOrders";
import { SubLineHeading } from "@/components/ui/custom/SubLineHeading";
import { nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const OrdersList = () => {
  return (
    <div>
      <h1
        className={cn("text-2xl uppercase tracking-wide-20 drop-shadow-text")}
      >
        Settings
      </h1>
      <p className={cn("mt-6 text-base", nunito.className)}>
        View all orders and manage your account
      </p>
      <SubLineHeading className="mt-6">
        <h2 className="text-lg uppercase tracking-wide-20 drop-shadow-text">
          Orders
        </h2>
      </SubLineHeading>
      <EmptyOrders />
    </div>
  );
};
