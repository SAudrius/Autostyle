import { Line } from "@components/ui/custom/Line";
import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/config/utils";

interface SubLineHeadingProps {
  children: React.ReactNode;
  className?: string;
  hasBtn?: boolean;
}

export const SubLineHeading = ({
  children,
  className,
  hasBtn = false,
}: SubLineHeadingProps) => {
  return (
    <div
      className={cn("grid ", className, {
        "grid-cols-2": hasBtn,
      })}
    >
      {!hasBtn && children}
      {hasBtn && <div className="flex items-center">{children}</div>}
      {hasBtn && (
        <div className="flex items-center justify-end">
          <Button variant="outline" size="small" className="rounded">
            LOG OUT
          </Button>
        </div>
      )}
      <Line className={cn({ "col-span-2": hasBtn })}></Line>
    </div>
  );
};
