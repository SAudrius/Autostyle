'use server'
import { cookies } from "next/headers"
import * as z from "zod";

import { 
    checkUserEmailLimit,
    createExpiryTime,
    generateRandomSixNumberCode 
} from "@/config/helpers";
import {
    changeEmailSchema,
    createVerificationCodeByEmail,
    deleteVerificationCodesByUserId,
    getCountVerificationCodesByUserId,
    getUserById, getUserCountByEmail,
    sendEmail,
    tokenDataByToken,
    updatePreChangeEmailByUserId
} from "@/lib";

export const changeEmail = async ( values: z.infer<typeof changeEmailSchema> ) => {
    const authCookie = cookies().get( 'auth' )
    
    if ( !authCookie ) {
        return { error: 'Something went wrong' }
    }
    
    const jwtTokenData = await tokenDataByToken( authCookie.value )
    if ( !jwtTokenData ) {
        return  { error: 'Something went wrong' }
    }
    
    const userId = parseInt( jwtTokenData?.userId )

    const validValues = changeEmailSchema.safeParse( values );
    if ( !validValues.success ) {
        return { error: "Fields are not valid" };
    }

    const userData = await getUserById( userId )

    if( !userData ) {
        return { error: 'Something went wrong' }
    }


    if ( userData.email === validValues.data.email ) {
        return { error: "You're already using this email." }
    }

    const emailExistCount = await getUserCountByEmail( validValues.data.email )
    if ( emailExistCount?.count ) {
        return { error: 'Email already in use' }
    }

    const userCodesCount = await getCountVerificationCodesByUserId( userId, 'email' )
    if ( userCodesCount ) {

        const deletedTokenRows = await deleteVerificationCodesByUserId( userData.id, 'email' )
        if ( deletedTokenRows?.affectedRows !== 1 ) {
            return { error: 'Something went wrong' }
        }
    }

    const resetPreChangeEmailRows = await updatePreChangeEmailByUserId( userData.id, '' )
    if ( resetPreChangeEmailRows === undefined ) {
        console.log( 'reset' )
        return { error: 'Something went wrong' }
    }
    
    console.log( 'validValues.data.email ===', validValues.data.email );
    const preChangeEmailRows = await updatePreChangeEmailByUserId( userData.id, validValues.data.email )

    if ( preChangeEmailRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }

    const newCode = generateRandomSixNumberCode()
    const expiresAt = createExpiryTime( 1 )
    
    const rows = await createVerificationCodeByEmail( userData.id, userData.email, newCode, 'email', expiresAt )
    console.log( '2 newCode ===', newCode );
    if ( rows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }

    const { error: expiredError } = await checkUserEmailLimit( userData )
    if ( expiredError ) {
        return { error:expiredError }
    }


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const responseBoolean = await sendEmail( validValues.data.email, 'd-779fa593b1bf4656b3cca45e16a5ff93', { code: newCode } );
    if ( !responseBoolean ) {
        return { error: 'Something went wrong' }
    }
    
    return { success: 'Email Send!' }
}
