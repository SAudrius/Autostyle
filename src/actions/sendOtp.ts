'use server'

import { checkUserEmailLimit, createExpiryTime, generateRandomSixNumberCode } from "@config/helpers"
import { tokenDataByToken } from "@lib/auth/auth"
import { getUserById } from "@lib/data/users"
import { createVerificationCodeByEmail, deleteVerificationCodesByUserId, getVerificationCodeByUserId } from "@lib/data/verificationCodes"
import { cookies } from "next/headers"

import { sendEmail } from "@/lib/mail/sendMail"

export const sendOtp = async ( type: 'password' | 'email', templateId: string ) => {

    const authCookie = cookies().get( 'auth' )
    if ( !authCookie ) {
        return { error: 'logout' };
    }

    const jwtTokenData = await tokenDataByToken( authCookie.value )
    if ( !jwtTokenData ) {
        return { error: 'Something went wrong' };
    }

    const userId = parseInt( jwtTokenData?.userId )

    const userData = await getUserById( userId )
    if ( !userData ) {
        return { error: 'Something went wrong' };
    }

    const oldCode = await getVerificationCodeByUserId( userData.id, type );
    if ( oldCode?.email ) {

        const deletedTokenRows = await deleteVerificationCodesByUserId( userData.id, type )
        if ( deletedTokenRows?.affectedRows !== 1 ) {
            return { error: 'Something went wrogn' }
        }
    }

    const newCode = generateRandomSixNumberCode()
    const expiresAt = createExpiryTime( 1 )
    
    const newCodeRows = await createVerificationCodeByEmail( userData.id, userData.email, newCode, type, expiresAt )
    if ( newCodeRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }

    const { error: expiredError } = await checkUserEmailLimit( userData )
    if ( expiredError ) {
        return { error:expiredError }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseBoolean = await sendEmail( userData.email, templateId, { code: newCode } );
    if ( !responseBoolean ) {
        return { error: 'Something went wrong' }
    }
    return { success: 'Success!' }
}