import React from "react";

import { EmptyOrders } from "@/app/(protected)/account/_components/ui/EmptyOrders";
import { SubLineHeading } from "@/components/ui/custom/SubLineHeading";
import { montserrat, nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const OrdersList = () => {
  return (
    <div>
      <h1
        className={cn(
          "tracking-wide-20 drop-shadow-text text-2xl uppercase",
          montserrat.className,
        )}
      >
        Settings
      </h1>
      <p className={cn("mt-6 text-base", nunito.className)}>
        View all orders and manage your account
      </p>
      <SubLineHeading className="mt-6">
        <h2 className="drop-shadow-text tracking-wide-20 text-lg uppercase">
          Orders
        </h2>
      </SubLineHeading>
      <EmptyOrders />
    </div>
  );
};
