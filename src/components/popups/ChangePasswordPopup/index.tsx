"use client";
import React, {
    useState,
} from "react";

import { validateOtp } from "@/actions/validateOtp";
import { cn } from "@/config/utils";
import { useAppDispatch } from "@/lib/hooks";
import { turnPopupAndModalOff, turnPopupAndModalOn } from "@/lib/store/storeHelpers/storeHelpers";

import { ChangePasswordSection } from "./_components/ChangePasswordSection";
import { ConfirmCodeSection } from "./_components/ConfirmCodeSection";
import { ConfirmSection } from "./_components/ConfirmSection";
import { sendOtp } from "./actions/sendOtp";

export const ChangePasswordPopup = () => {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ otpArr, setOtpArr ] = useState( [ "", "", "", "", "", "" ] );
    const [ isConfirmedCode, setIsConfirmedCode ] = useState( false );
    const [ isConfirmedPasswordChange, setIsConfirmedPasswordChange ] = useState( false );

    const handleProcced = () => {
        setLoading( true );
        const mailResponse = async () => {
            const mailActionResponse = await sendOtp( 'password', 'changePassword' );
            if ( mailActionResponse?.error ) {
                turnPopupAndModalOn( dispatch, 'error' )
            }
            if ( mailActionResponse?.success ) {
                setIsConfirmedPasswordChange( true );
            }
            setLoading( false )
        };
        mailResponse();
    };

    const handleCancel = () => {
        setLoading( false );
        turnPopupAndModalOff( dispatch );
        new Promise( ( resolve ) => setTimeout( resolve, 300 ) ).then( () => {
            setOtpArr( [ "", "", "", "", "", "" ] )
            setError( "" )
            setIsConfirmedCode( false )
            setIsConfirmedPasswordChange( false )
        } )  
    };

    const handleSubmitCode = () => {
        setLoading( true );
        setError( '' )
        const otpString = otpArr.toString().replace( /,/g, "" );
        const otpResponse = async () => {
            const otpActionResponse = await validateOtp( { otpCode: otpString }, 'password' );
            if ( otpActionResponse.error ) {
                setError( otpActionResponse.error )
            }
            if ( otpActionResponse.success ) {
                setIsConfirmedCode( true )
                setError( '' )
            }
            setLoading( false )

        };
        otpResponse();
    };

    return (
        <div className={cn( "inline-block w-[400px] rounded bg-neutral-100 p-8", { 'w-[500px]': isConfirmedCode } )}>
            {!isConfirmedPasswordChange && (
                <ConfirmSection handleCancel={handleCancel} handleProcced={handleProcced} loading={loading}/>
            )}
            {isConfirmedPasswordChange && !isConfirmedCode && (
                <ConfirmCodeSection handleCancel={handleCancel} handleSubmitCode={handleSubmitCode} otpArr={otpArr} setOtpArr={setOtpArr} loading={loading} error={error} />
            )}
            {isConfirmedCode && (
                <ChangePasswordSection handleClose={handleCancel} />
            )}
        </div>
    );
};
