import React from 'react'

import { cn } from '@/config'

interface VerticalLineProps {
    className?: string
}

export const VerticalLine = ( { className }: VerticalLineProps ) => {
    return (
        <div className={cn( 'w-[1px] h-full bg-neutral-500', className )}></div>
    )
}
