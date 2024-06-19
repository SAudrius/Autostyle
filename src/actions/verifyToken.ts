'use server'

import { getUserByEmail, updateUserEmailVerifiedById } from "@lib/data/users"
import { getEmailByToken } from "@lib/data/verificationTokens"

export const verifyToken = async (token: string) => {
    const currentTime = new Date() 
    const verifyTokenData = await getEmailByToken(token)

    if (!verifyTokenData?.email) {
        return
    }

    const verifyTokenExpires = new Date(verifyTokenData.expires).getTime();
    const expiredTime = new Date(currentTime.getTime() + (30 * 60000))

    
    if (verifyTokenExpires > expiredTime.getTime()) {
        return {error: 'Token is expired'}
    }

    const userData = await getUserByEmail(verifyTokenData.email)

    if (userData?.email_verified === 1) {
        return {success: 'Email Verified'}
    }

    if (!userData) {
        return {error: 'Something went wrong'}
    }
    const rows = await updateUserEmailVerifiedById(userData.id)
    console.log('rows ===', rows);
    if (rows?.affectedRows !== 1 ) {
        return {error: 'Something went wrong'}
    }   
    return {success: 'Email Verified' }
}