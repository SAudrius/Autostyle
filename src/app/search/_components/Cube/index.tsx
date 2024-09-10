'use client'
import React from 'react'

import { cn } from '@/config'

interface CubeProps {
    variant: 'single' | 'duoble' | 'triple'
    onClick?: () => void
    active?: boolean
    className?: string
}

export const Cube = ( { variant, className, onClick, active } : CubeProps ) => {
    return (
        <>
            { variant === "single" ? 
                <div onClick={onClick} className={cn( 'h-5 w-5 bg-neutral-500', { "bg-neutral-800":active }, className )}>
                </div>
                : null 
            }
            { variant === "duoble" ? 
                <div onClick={onClick} className={cn( 'h-5 w-5 grid grid-cols-2 gap-[3px]', className )}>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                </div>
                : null 
            }
            { variant === "triple" ? 
                <div onClick={onClick} className={cn( 'h-5 w-5 grid grid-cols-3 gap-[2px]', className )}>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                    <span className={cn( 'bg-neutral-500', { "bg-neutral-800":active } )}></span>
                </div>
                : null 
            }
        </>
    )
}
