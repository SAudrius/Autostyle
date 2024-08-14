import React from "react";

import { cn } from "@/config";

interface LineProps {
  className?: string;
  primary?: boolean;
}

export const Line = ( { className, primary }: LineProps ) => {
    if ( primary ) {
        return (
            <span
                className={cn( "block h-[1px] w-full bg-primary-dark", className )}
            ></span>
        );
    }
    return (
        <span
            className={cn( "block h-[1px] w-full bg-neutral-500", className )}
        ></span>
    );
};
