'use client'
import { nunito } from '@config/fonts'
import { cn } from '@config/utils'
import { useAppSelector } from '@lib/hooks'
import React from 'react'

export const ErrorPopup = () => {
    const message = useAppSelector( ( state ) => state.popup.message )
    console.log( 'message ===', message );
    return (
        <div className={cn( "inline-block w-[400px] rounded bg-neutral-100 p-8" )}>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Something went wrong
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                {message ? message : "An unexpected error has occurred. Please try again later."}
            </p>
        </div>
    )
}
