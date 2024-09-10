'use client'
import React from 'react'

import { cn } from '@/config'

interface ArrowDownProps {
    activator?: boolean,
    className?: string
}

export const ArrowDown = ( { activator, className }: ArrowDownProps ) => {

    return (
        <div className={className}>
            <div className={cn( 'w-[20px] h-[20px] relative' )}>
                <div className={cn( "w-[1px] h-[8px] rotate-[-45deg] rounded bg-black absolute right-[7px] top-[6px] transition-transform duration-300", { 'rotate-45' :activator } )}></div>
                <div className={cn( "w-[1px] h-[8px] rotate-[45deg] rounded bg-black absolute left-[7px] top-[6px] transition-transform duration-300", { 'rotate-[-45deg]':activator } )}></div>
            </div>
        </div>
    )
}
