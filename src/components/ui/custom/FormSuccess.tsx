import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";

import { cn } from "@/config/utils";

interface FormSuccessProps {
  message?: string;
  className?: string;
}

export const FormSuccess = ({ message, className }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        `flex items-center justify-center gap-x-2 rounded-md bg-emerald-500/15 p-2 text-sm text-emerald-500 ${className}`,
      )}
    >
      <CheckCircledIcon className="2-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
