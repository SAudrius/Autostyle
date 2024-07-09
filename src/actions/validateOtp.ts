'use server'

import { tokenDataByToken } from "@lib/auth/auth";
import { getVerificationCodeById } from "@lib/data/verificationCodes";
import { otpCodeSchema } from "@lib/schemas"
import { cookies } from "next/headers";

export const validateOtp = async ( otpCode: { otpCode: string } ) => {
    const keyword = 'password'
    const otpValid = otpCodeSchema.safeParse( otpCode );
    if ( !otpValid.success ) {
        console.log( 'otpValid ' );
        return { error: "Values are not valid" };
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

    const verificationCodeData = await getVerificationCodeById( userId, keyword )

    if ( !verificationCodeData ) {
        console.log( 'verificationCodeData ===', verificationCodeData );
        return { error: 'Something went wrong' }
    }

    if ( parseInt( verificationCodeData.code ) !== parseInt( otpCode.otpCode ) ) {
        console.log( ' verificationCodeData.code ===',  verificationCodeData.code );
        return { error: 'Code is incorrect' }
    }

    return { error: 'Code confirmed' }

}