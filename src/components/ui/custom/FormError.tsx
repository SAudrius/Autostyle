import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

import { cn } from "@/config/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
}

export const FormError = ({ message, className }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div
      className={cn(
        `flex items-center justify-center gap-x-2 rounded-md bg-red-500/20 p-3 text-sm text-red-700 ${className}`,
      )}
    >
      <ExclamationTriangleIcon className="2-4 h-4" />
      <p>{message}</p>
    </div>
  );
};
