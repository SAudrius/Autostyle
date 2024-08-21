import React from "react";

import { cn } from "@/config";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ( { children, className }: ContainerProps ) => {
    return <div className={cn( `container-v2 ${className}` )}>{children}</div>;
};
