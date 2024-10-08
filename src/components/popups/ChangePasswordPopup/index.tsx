"use client";
import React, {
    useState,
} from "react";

import { sendOtp, validateOtp } from "@/actions";
import { cn } from "@/config";
import { 
    popupSetErrorMessage, 
    turnPopupAndModalOff, 
    turnPopupAndModalOn, 
    useAppDispatch 
} from "@/lib";

import { ChangePasswordSection } from "./_components/ChangePasswordSection";
import { ConfirmCodeSection } from "./_components/ConfirmCodeSection";
import { ConfirmSection } from "./_components/ConfirmSection";

export const ChangePasswordPopup = () => {
    const dispatch = useAppDispatch();
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ success, setSuccess ] = useState( false );

    const [ otpArr, setOtpArr ] = useState( [ "", "", "", "", "", "" ] );
    const [ isConfirmedCode, setIsConfirmedCode ] = useState( false );
    const [ isConfirmedPasswordChange, setIsConfirmedPasswordChange ] = useState( false );

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

    const handleSendNewCode = ( type: 'password' | 'email', template: string ) => {
        setLoading( true );
        setError( '' )
        setSuccess( false )

        const mailResponse = async () => {
            const mailActionResponse = await sendOtp( type, template );
            if ( mailActionResponse?.error ) {
                turnPopupAndModalOn( dispatch, 'error' )
                dispatch( popupSetErrorMessage( mailActionResponse.error ) )

                return
            }
            if ( mailActionResponse?.success )  {
                setSuccess( true )
            }
            setLoading( false )
        };
        mailResponse();
    }

    const handleProcced = () => {
        setLoading( true );
        const mailResponse = async () => {
            const mailActionResponse = await sendOtp( 'password', 'd-17cd4ccfc9bb4d5085f33502da0242c7' );
            if ( mailActionResponse?.error ) {
                console.log( 'mailActionResponse ===', mailActionResponse );
                turnPopupAndModalOn( dispatch, 'error' )
                dispatch( popupSetErrorMessage( mailActionResponse?.error ) )
            }
            if ( mailActionResponse?.success ) {
                setIsConfirmedPasswordChange( true );
            }
            setLoading( false )
        };
        mailResponse();
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
                <ConfirmSection handleCancel={handleCancel} handleProcced={handleProcced} loading={loading} />
            )}
            {isConfirmedPasswordChange && !isConfirmedCode && (
                <ConfirmCodeSection handleCancel={handleCancel} handleSubmitCode={handleSubmitCode} handleSendNewCode={() => handleSendNewCode( 'password', 'd-17cd4ccfc9bb4d5085f33502da0242c7' )} otpArr={otpArr} setOtpArr={setOtpArr} loading={loading} error={error} success={success} />
            )}
            {isConfirmedCode && (
                <ChangePasswordSection handleClose={handleCancel} />
            )}
        </div>
    );
};
