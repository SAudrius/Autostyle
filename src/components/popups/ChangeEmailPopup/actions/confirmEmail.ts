'use server'

import { cookies } from "next/headers";

import { tokenDataByToken } from "@/lib/auth/auth";
import { getUserById, updateEmailByUserId } from "@/lib/data/users";
import { deleteVerificationCodesByUserId, getVerificationCodeByUserId } from "@/lib/data/verificationCodes";
import { sendEmail } from "@/lib/mail/sendMail";
import { otpCodeSchema } from "@/lib/schemas";

export const confirmEmail = async ( otpCode: { otpCode: string }, type: 'email' | 'password' ) => {
    const otpValid = otpCodeSchema.safeParse( otpCode );
    if ( !otpValid.success ) {
        return { error: "Values are not valid" };
    }

    const authCookie = cookies().get( 'auth' )
    if ( !authCookie ) {
        return { error: 'Something went wrong' }
    }

    const jwtTokenData = await tokenDataByToken( authCookie.value )
    if ( !jwtTokenData ) {
        return { error: 'Something went wrong' }
    }

    const userId = parseInt( jwtTokenData?.userId )

    const verificationCodeData = await getVerificationCodeByUserId( userId, type )
    if ( !verificationCodeData ) {
        return { error: 'Something went wrongs' }
    }

    if ( parseInt( verificationCodeData.code ) !== parseInt( otpCode.otpCode ) ) {
        return { error: 'Invalid Code' }
    }

    const userData = await getUserById( userId )
    if( !userData?.email_pre_change ) {
        return { error: 'Something went wrong' }
    }

    const changeEmailRows = await updateEmailByUserId( userId, userData.email_pre_change, userData.email )
    if( changeEmailRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }

    const deletedTokenRows = await deleteVerificationCodesByUserId( userId, type )
    if ( deletedTokenRows?.affectedRows !== 1 ) {
        return { error: 'Semething went wrong' }
    }
    
    console.log( 'userData.email_pre_change ===', userData.email_pre_change );
    const responseBooleanNewEmail = await sendEmail( userData.email_pre_change, 'd-619f97b03d914a70984f793e7a4eb7fb' );
    if ( !responseBooleanNewEmail ) {
        return { error: 'Something went wrong' }
    }
    const responseBooleanPrevEmail = await sendEmail( userData.email, 'd-c3f3c756171c4337962d1c9b3b2f1b84' );
    if ( !responseBooleanPrevEmail ) {
        return { error: 'Something went wrong' }
    }

    return { success: 'Code Confirmed' }
}