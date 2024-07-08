'use server'

import { createExpiryTime, generateRandomSixNumberCode } from "@config/helpers"
import { tokenDataByToken } from "@lib/auth/auth"
import { getUserById } from "@lib/data/users"
import { createVerificationCodeByEmail } from "@lib/data/verificationCodes"
import { sendMailCode } from "@lib/mail/mail"
import { cookies } from "next/headers"

export const sendOtp = async () => {

    const authCookie = cookies().get( 'auth' )
    
    if ( !authCookie ) {
        return { error: 'logout' };

    }
    const jwtTokenData = await tokenDataByToken( authCookie.value )

    if ( !jwtTokenData ) {
        console.log( 'something went wrong' );
        return { error: 'Something went wrong' };
    }

    const userId = parseInt( jwtTokenData?.userId )

    const userData = await getUserById( userId )

    if ( !userData ) {
        console.log( 'no user found' );
        return { error: 'Something went wrong' };
    }

    const newCode = generateRandomSixNumberCode()
    const expiresAt = createExpiryTime( 1 )
    
    const rows = await createVerificationCodeByEmail( userData.id, userData.email, newCode, 'password', expiresAt )
    console.log( 'newCode ===', newCode );
    if ( rows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mailError } = await sendMailCode( userData.email, newCode, 'changePassword' )
    
    if( mailError ){
        console.log( 'something went wrong with mail' )
        return { error: 'Something went wrong' }
    }

    return { success: 'Success!' }
}