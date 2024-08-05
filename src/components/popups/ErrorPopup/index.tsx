import { nunito } from '@config/fonts'
import { cn } from '@config/utils'
import React from 'react'

export const ErrorPopup = () => {
    return (
        <div className={cn( "inline-block w-[400px] rounded bg-neutral-100 p-8" )}>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Procced password change
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                An unexpected error has occurred. Please try again later.
            </p>
        </div>
    )
}
