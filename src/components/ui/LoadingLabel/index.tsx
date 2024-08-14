import React from "react";

import { cn } from "@/config";

interface LoadingLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const LoadingLabel = ( { children, className }: LoadingLabelProps ) => {
    return (
        <p
            className={cn(
                `text-lg font-medium text-neutral-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`,
            )}
        >
            {children}
        </p>
    );
};
