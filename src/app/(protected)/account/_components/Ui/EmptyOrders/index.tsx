import React from "react";

import { Button } from "@/components/ui/button";
import { nunito } from "@/config/fonts";
import { cn } from "@/config/utils";

export const EmptyOrders = () => {
  return (
    <div>
      <h3 className={cn("mt-6 text-base", nunito.className)}>
        You do not have any orders yet
      </h3>
      <Button className="mt-4" variant="secondary" size="lg">
        Continue Shopping
      </Button>
    </div>
  );
};
