'use server'

import { createExpiryTime, generateRandomSixNumberCode } from "@config/helpers"
import { tokenDataByToken } from "@lib/auth/auth"
import { getUserById } from "@lib/data/users"
import { createVerificationCodeByEmail, deleteVerificationCodesByUserId, getVerificationCodeByUserId } from "@lib/data/verificationCodes"
import { sendMailCode } from "@lib/mail/mail"
import { cookies } from "next/headers"

export const sendOtp = async ( type: 'email' | 'password', template: "changeEmail" | "changePassword" | 'successEmailStepOne' | 'successEmailStepTwo' ) => {
    console.log( 'send otp' )

    const authCookie = cookies().get( 'auth' )
    
    if ( !authCookie ) {
        console.log( '4' )
        return { error: 'logout' };

    }
    const jwtTokenData = await tokenDataByToken( authCookie.value )

    if ( !jwtTokenData ) {
        console.log( '3' )

        console.log( 'something went wrong' );
        return { error: 'Something went wrong' };
    }

    const userId = parseInt( jwtTokenData?.userId )

    const userData = await getUserById( userId )

    if ( !userData ) {
        console.log( '2' )

        console.log( 'no user found' );
        return { error: 'Something went wrong' };
    }

    const oldCode = await getVerificationCodeByUserId( userData.id, type );
    if ( oldCode?.email ) {
        
        const deletedTokenRows = await deleteVerificationCodesByUserId( userData.id, type )
        console.log( '@1', deletedTokenRows )
        if ( deletedTokenRows?.affectedRows !== 1 ) {
            console.log( '1' )
            return { error: 'Something went wrogn' }
        }
    }

    const newCode = generateRandomSixNumberCode()
    const expiresAt = createExpiryTime( 1 )
    
    const rows = await createVerificationCodeByEmail( userData.id, userData.email, newCode, type, expiresAt )
    console.log( 'newCode ===', newCode );
    if ( rows?.affectedRows !== 1 ) {
        console.log( '5' )

        return { error: 'Something went wrong' }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mailError } = await sendMailCode( userData.email, newCode, template )
    
    if( mailError ){
        console.log( '6' )
        console.log( 'something went wrong with mail' )
        return { error: 'Something went wrong' }
    }

    return { success: 'Success!' }
}