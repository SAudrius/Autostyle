'use server'
import { createVerificationTokenByEmail, deleteVerificationTokenById, getVerificationTokenByEmail } from '@lib/data/verificationTokens'
import {v4 as uuidv4} from 'uuid'

export const generateVerificationToken = async (email:string) => {
    const token = uuidv4()
    const existingToken = await getVerificationTokenByEmail(email)
    if (existingToken) {
        const deletedResponse = await deleteVerificationTokenById(existingToken.id)
        if (deletedResponse?.affectedRows !== 1) {
            return
        }
    }
    const rows = await createVerificationTokenByEmail(email,token)
    if (rows?.affectedRows !== 1) {
        return
    }
    return token;
}