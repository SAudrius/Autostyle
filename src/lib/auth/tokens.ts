'use server'
import { createVerificationTokenByEmail, deleteVerificationTokenById, getVerificationTokenByEmail } from '@lib/data/verificationTokens'
import { v4 as uuidv4 } from 'uuid'

export const generateVerificationToken = async (email:string,type: 'password' | 'email') => {
    const token = uuidv4()
    const tokenType = type;

    const existingToken = await getVerificationTokenByEmail(email, tokenType)
    if (existingToken) {
        const deletedResponse = await deleteVerificationTokenById(existingToken.id,tokenType)
        if (deletedResponse?.affectedRows !== 1) {
            return
        }
    }

    const rows = await createVerificationTokenByEmail(email, token, type)
    if (rows?.affectedRows !== 1) {
        return
    }
    return token;
}