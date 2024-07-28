import { CheckCircledIcon } from "@radix-ui/react-icons";
import React from "react";

import { cn } from "@/config/utils";

interface FormSuccessProps {
  message?: string;
  className?: string;
  size?: 'small' | 'default';
}

export const FormSuccess = ( { message, className, size = 'default' }: FormSuccessProps ) => {
    if ( !message ) return null;

    const selectClass = () => {
        if ( size === 'default' ) {
            return 'flex items-center justify-center gap-x-2 rounded-md bg-emerald-500/15 p-2 text-sm text-emerald-500'
        } else {
            return 'w-full rounded h-[36px] bg-emerald-300/50 px-4 py-[8px] text-base text-center text-emerald-500'
        }
    }
    const divClass = selectClass()

    return (
        <div
            className={cn(
                `${divClass} flex justify-center items-center gap-[3px] ${className}`,
            )}
        >
            <CheckCircledIcon className="h-4 mt-[2px]" />
            <p className="h-full mb-[2px]">{message}</p>
        </div>

    );
};                    