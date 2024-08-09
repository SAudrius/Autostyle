import { Button } from '@components/ui/button'
import { nunito } from '@config/fonts'
import { cn } from '@config/utils'
import React from 'react'

import { FormLoading } from '@/components/ui/custom/FormLoading';

interface ConfirmSectionProps {
    handleProcced: () => void;
    handleCancel: () => void;
    loading: boolean;
}

export const ConfirmSection = ( { handleProcced, handleCancel, loading }: ConfirmSectionProps ) => {
    return ( 
        <>
            <h3 className="nunit text-center text-xl tracking-wide-12">
                Confirm password change
            </h3>
            <p className={cn( "mt-4 text-center", nunito.className )}>
                Are you sure you want to change your password? If you proceed, you
                will receive a verification code via email to complete the process.
            </p>
            {loading && <FormLoading />}
            <div className="mt-4 grid grid-cols-2 gap-6">
                <Button
                    type="button"
                    variant="secondary"
                    className="normal-case"
                    onClick={handleProcced}
                >
                    Yes, proceed
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                    No, cancel
                </Button>
            </div>
        </>
    )
}
