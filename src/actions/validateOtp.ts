'use server'

import { tokenDataByToken } from "@lib/auth/auth";
import { deleteVerificationCodesByUserId, getVerificationCodeByUserId } from "@lib/data/verificationCodes";
import { otpCodeSchema } from "@lib/schemas"
import { cookies } from "next/headers";

export const validateOtp = async ( otpCode: { otpCode: string }, type: 'email' | 'password' ) => {
    const otpValid = otpCodeSchema.safeParse( otpCode );
    if ( !otpValid.success ) {
        console.log( 'otpValid ' );
        return { error: "Must enter the code" };
    }

    const authCookie = cookies().get( 'auth' )
    if ( !authCookie ) {
        console.log( 'authCookie ===', authCookie );
        return { error: 'Something went wrong' }
    }

    const jwtTokenData = await tokenDataByToken( authCookie.value )
    if ( !jwtTokenData ) {
        console.log( 'jwtTokenData ===', jwtTokenData );
        return { error: 'Something went wrong' }
    }

    const userId = parseInt( jwtTokenData?.userId )

    const verificationCodeData = await getVerificationCodeByUserId( userId, type )

    if ( !verificationCodeData ) {
        console.log( 'verificationCodeData ===', verificationCodeData );
        return { error: 'Something went wrong' }
    }

    if ( parseInt( verificationCodeData.code ) !== parseInt( otpCode.otpCode ) ) {
        console.log( ' verificationCodeData.code ===',  verificationCodeData.code );
        return { error: 'Invalid Code' }
    }

    const deletedTokenRows = await deleteVerificationCodesByUserId( userId, type )
    if ( deletedTokenRows?.affectedRows !== 1 ) {
        return { error: 'Semething went wrong' }
    }

    return { success: 'Code Confirmed' }

}