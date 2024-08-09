'use server'

import { getUserByEmail, updateUserEmailVerifiedById } from "@lib/data/users"
import { deleteVerificationTokenById, getVerificationTokenByToken } from "@lib/data/verificationTokens"

import { sendEmail } from "@/lib/mail/sendMail"

export const verifyToken = async ( token: string ) => {
    const currentTime = new Date() 
    const verifyTokenData = await getVerificationTokenByToken( token  )

    if ( !verifyTokenData?.email ) {
        return { error: 'Something went wrong' }
    }

    const verifyTokenExpires = new Date( verifyTokenData.expires ).getTime();
    const expiredTime = new Date( currentTime.getTime() + ( 30 * 60000 ) )

    
    if ( verifyTokenExpires > expiredTime.getTime() ) {
        return { error: 'Token is expired' }
    }

    const userData = await getUserByEmail( verifyTokenData.email )

    if ( userData?.email_verified === 1 ) {
        return { success: 'Email Verified' }
    }

    if ( !userData ) {
        return { error: 'Something went wrong' }
    }
    const updatedUserRows = await updateUserEmailVerifiedById( userData.id )
    if ( updatedUserRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }   
  
    const responseBoolean = await sendEmail( userData.email, 'd-f6e1abd0be7e4fc090a035c3e63b6751' );
    if ( !responseBoolean ) {
        return { error: 'Something went wrong' }
    }

    const deletedTokenRows = await deleteVerificationTokenById( verifyTokenData.id )

    if ( deletedTokenRows?.affectedRows !== 1 ) {
        return { error: 'Something went wrong' }
    }  

    return { success: 'Email Verified!' }
}