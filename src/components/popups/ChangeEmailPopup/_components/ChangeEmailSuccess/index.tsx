import React from 'react'

import { Button } from '@/components';
import { cn, nunito  } from '@/config';

interface ChangeEmailSuccessProps {
    handleComplete: () => void,
}

export const ChangeEmailSuccess = ( { handleComplete,
}: ChangeEmailSuccessProps ) => {
    return (
        <>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Email Changed
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                The email change is successful. Thank you for keeping your information current with us!
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
