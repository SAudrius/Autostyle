import React from "react";

import { cn } from "@/config/utils";

interface LineProps {
  className?: string;
}

export const Line = ({ className }: LineProps) => {
  return (
    <span
      className={cn(
        "mt-4 inline-block h-[1px] w-full bg-neutral-500",
        className,
      )}
    ></span>
  );
};
