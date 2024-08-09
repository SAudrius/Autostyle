import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

import { cn } from '@/config';

interface FormLoadingProps {
    className?: string;
}

export const FormLoading = ( { className }: FormLoadingProps ) => {
    return (
        <div className={cn( "w-full flex rounded bg-transparent h-[12px] py-4 justify-center items-center box-border pr-[10px]", className )}>
            <PropagateLoader size='12px' />
        </div>
    )
}
