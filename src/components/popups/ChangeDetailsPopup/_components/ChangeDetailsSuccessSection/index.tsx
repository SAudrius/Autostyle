
import { Button } from '@components/ui/button'
import { nunito } from '@config/fonts'
import { cn } from '@config/utils'
import React from 'react'

interface ChangeDetailsSuccessSectionProps {
    handleComplete: () => void
}

export const ChangeDetailsSuccessSection = ( { handleComplete }: ChangeDetailsSuccessSectionProps ) => {
    return (
        <>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Details Changed
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                Your details change is successful. Thank you for keeping your information current with us!
            </p>
            <Button
                onClick={handleComplete}
                className="mt-4"
                size="full"
                variant="secondary"
            >
                Close
            </Button>
        </>
    )
}

