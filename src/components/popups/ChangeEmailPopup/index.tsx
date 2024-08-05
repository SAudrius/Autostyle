"use client";
import { cn } from "@config/utils";
import { useAppDispatch } from "@lib/hooks";
import { changeEmailSchema } from "@lib/schemas";
import { turnPopupAndModalOff, turnPopupAndModalOn } from "@lib/store/storeHelpers/storeHelpers";
import React, {
    useState,
} from "react";
import * as z from "zod";

import { sendOtp } from "@/actions/sendOtp";
import { validateOtp } from "@/actions/validateOtp";

import { ChangeEmailSection } from "./_components/ChangeEmailSection";
import { ChangeEmailSuccess } from "./_components/ChangeEmailSuccess";
import { ConfirmEmailCodeSection } from "./_components/ConfirmEmailCodeSection";
import { ConfirmEmailCodeTwoSection } from "./_components/ConfirmEmailCodeTwoSection";
import { ConfirmSection } from "./_components/ConfirmSection";
import { changeEmail } from "./actions/changeEmail";
import { confirmEmail } from "./actions/confirmEmail";

export const ChangeEmailPopup = () => {
    const dispatch = useAppDispatch();
    const [ otpArr, setOtpArr ] = useState( [ "", "", "", "", "", "" ] );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( '' );
    const [ success, setSuccess ] = useState( false );

    const [ isProceeded, setIsProceeded ] = useState<boolean>( false );

    const [ isConfirmedCode, setIsConfirmedCode ] = useState( false );

    const [ isConfirmedEmailChange, setIsConfirmedEmailChange ] = useState<boolean>( false );
    const [ errorEmail, setErrorEmail ] =  useState( '' )

    const [ isConfirmedCodeTwo, setIsConfirmedCodeTwo ] = useState( false );

    const handleCancel = () => {
        setLoading( false );
        turnPopupAndModalOff( dispatch );
    };

    const handleSendNewCode = ( type: 'password' | 'email', template: string ) => {
        setLoading( true );
        setSuccess( false )
        setError( '' )

        const mailResponse = async () => {
            const mailActionResponse = await sendOtp( type, template );
            if ( mailActionResponse?.error ) {
                turnPopupAndModalOn( dispatch, 'error' )
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
            const mailActionResponse = await sendOtp( 'email', 'd-c7fcc41bbaf34d9385c45a30bf2e86bc' );
            if ( mailActionResponse?.error ) {
                turnPopupAndModalOn( dispatch, 'error' )
                return
            }
            setIsProceeded( true );
            setLoading( false )
        };
        mailResponse();
    };

    const handleSubmitCode = () => {
        setLoading( true );
        setError( '' )
        const otpString = otpArr.toString().replace( /,/g, "" );
        const otpResponse = async () => {
            const otpActionResponse = await validateOtp( { otpCode: otpString }, 'email' );
            if ( otpActionResponse?.error ) {
                setError( otpActionResponse.error )
                setSuccess( false )
            }
            if ( otpActionResponse?.success ) {
                setIsConfirmedCode( true )
                setError( '' )
                setSuccess( false )
            }
            setLoading( false );
        };
        otpResponse();
    };

    const handleSubmitNewEmail = ( values: z.infer<typeof changeEmailSchema> ) => {
        setLoading( true )
        setErrorEmail( "" );
        const changeEmailResponse = async () => {
            const changeEmailActionResponse = await changeEmail( values );
            if ( changeEmailActionResponse?.success ) {
                setOtpArr(  [ "", "", "", "", "", "" ] );
                setIsConfirmedEmailChange( true )
            }
            if ( changeEmailActionResponse?.error ) {
                setErrorEmail( changeEmailActionResponse?.error ); 
            }
            setLoading( false );
            return
        };
        changeEmailResponse();
    }
    
    const handleSubmitCodeTwo = () => {
        setLoading( true )
        setError( '' )
        const changePasswordResponse = async () => {
            const otpString = otpArr.toString().replace( /,/g, "" );
            const confirmEmailActionResponse = await confirmEmail( { otpCode: otpString }, 'email' );
            if ( confirmEmailActionResponse?.error ) {
                setError( confirmEmailActionResponse?.error ); 
            }
            if ( confirmEmailActionResponse?.success ) {
                setIsConfirmedCodeTwo( true ); 
                setError( '' )
            }
            setLoading( false );

        };
        changePasswordResponse();
    }

    const handelComplete = () => {
        handleCancel()
        new Promise( ( resolve ) => setTimeout( resolve, 300 ) ).then( () => {
            setError( '' )
            setLoading( false )
            setIsProceeded( false )
            setIsConfirmedCode( false )
            setIsConfirmedEmailChange( false )
            setIsConfirmedCodeTwo( false )
        } )
        location.reload();
    }

    return (
        <div className={cn( "inline-block w-[400px] rounded bg-neutral-100 p-8", { 'w-[500px]': isConfirmedCode, 'w-[400px]': isConfirmedEmailChange } )}>
            {!isProceeded && (
                <ConfirmSection handleCancel={handleCancel} handleProcced={handleProcced} loading={loading}/>
            )}
            {isProceeded && !isConfirmedCode && (
                <ConfirmEmailCodeSection handleCancel={handleCancel} handleSubmitCode={handleSubmitCode} handleNewCode={() => handleSendNewCode( "email", "d-c7fcc41bbaf34d9385c45a30bf2e86bc" )} otpArr={otpArr} setOtpArr={setOtpArr} loading={loading} error={error} success={success} />
            )}
            {isConfirmedCode && !isConfirmedEmailChange && (
                <ChangeEmailSection handleSubmit={handleSubmitNewEmail} error={errorEmail} loading={loading} />
            )}
            {isConfirmedEmailChange && !isConfirmedCodeTwo && (
                <ConfirmEmailCodeTwoSection handleCancel={handleCancel} handleSubmitCode={handleSubmitCodeTwo} handleNewCode={() => handleSendNewCode( "email", "d-c7fcc41bbaf34d9385c45a30bf2e86bc" )} otpArr={otpArr} setOtpArr={setOtpArr} loading={loading} error={error} success={success} />
            )}
            {isConfirmedCodeTwo && <ChangeEmailSuccess handleComplete={handelComplete}/>}
        </div>
    );

}