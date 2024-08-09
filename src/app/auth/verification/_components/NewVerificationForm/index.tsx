"use client";

// import { useSearchParams } from "next/navigation";
import { FormError, FormSuccess } from "@components/ui/custom";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

import { verifyToken } from "@/actions/verifyToken";

// import { newVerification } from "@/actions/new-verification";

export const NewVerificationForm = () => {
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const [ success, setSuccess ] = useState<undefined | string>( "" );
    const [ error, setError ] = useState<undefined | string>( "" );
    const searchParams = useSearchParams();
    const token = searchParams.get( "token" );
    const onSubmit = useCallback( () => {
        setSuccess( "" );
        setError( "" );
        if ( !token ) {
            setError( "Mising token" );
            return null;
        }
        const verifyResponse = async () => {
            const verifyActionResponse = await verifyToken( token );
            setError( verifyActionResponse?.error );
            setSuccess( verifyActionResponse?.success );
        };
        verifyResponse();
    }, [ token ] );

    useEffect( () => {
        onSubmit();
    }, [ onSubmit ] );

    return (
        <div className="gird col-span-1 ">
            {!success && !error && (
                <PulseLoader className="text-center" color="#000" />
            )}
            <FormSuccess message={success} />
            {!success && <FormError message={error} />}
        </div>
    );
};
