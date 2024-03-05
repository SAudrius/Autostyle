import React from "react";

import { Line, LogoutButton } from "@/components/ui/custom";
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
          <LogoutButton />
        </div>
      )}
      <Line className={cn({ "col-span-2": hasBtn })}></Line>
    </div>
  );
};
