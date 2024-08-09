import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

import { cn } from "@/config/utils";

interface FormErrorProps {
  message?: string;
  className?: string;
  size?: 'small' | 'default';
}

export const FormError = ( { message, className, size = 'default' }: FormErrorProps ) => {
    if ( !message ) return null;

    const selectClass = () => {
        if ( size === 'default' ) {
            return 'flex items-center justify-center gap-x-2 rounded-md bg-red-500/20 p-3 text-sm text-red-700'
        } else {
            return 'w-full rounded bg-red-300/50 px-4 py-2 h-[35px] text-center text-red-500 text-[15px]'
        }
    }
    const divClass = selectClass()

    return (
        <div
            className={cn(
                `${divClass} flex justify-center gap-[6px] ${className}`,
            )}
        >
            <ExclamationTriangleIcon className="h-4 mt-[4px]" />
            <p>{message}</p>
        </div>
    );
};
