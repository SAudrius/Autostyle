import { dbQuery } from "@lib/database/app";
import { ResultSetHeader } from "mysql2";

import { convertToDbDate } from "@/config/helpers";

export const createVerificationCodeByEmail = async ( userId: number, email: string, code: number, type: 'password' | 'email', expiresAt: number ) => {
    try {
        const dbExpires = convertToDbDate( expiresAt )
        const sql =
        "INSERT INTO verification_codes (user_id, email, code, type, expires_at) VALUES (?, ?, ?, ?, ?)";
        const dbParams = [ userId, email, code, type, dbExpires ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "somethink went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
};

export const getVerificationCodeById = async ( userId: number, type: 'password' | 'email' ) => {
    try {
        const sql =
        "SELECT * FROM verification_codes WHERE user_id = ? AND type = ?";
        const dbParams = [ userId, type ];
        const [ rows, error ] = await dbQuery<VerificationCode[]>( sql, dbParams );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "somethink went wrong" );
        }
        return rows[0]
    } catch ( error ) {
        return;
    }
}

// export const getEmailByToken = async (token: string, type: 'password' | 'password') => {
//     try {
//         const sql =
//         "SELECT * FROM verification_tokens WHERE token = ? AND type = ?";
//         const dbParams = [token, type];
//         const [rows, error] = await dbQuery<VerificationToken[]>(sql, dbParams);
//         if (error) {
//           throw new Error("somethink went wrong");
//         }
//         return rows[0]
//     } catch (error) {
//         return 
//     }
// }

export const deleteVerificationCodeByEmail = async ( email: number, type: 'password' | 'email' ) => {
    try {
        const sql =
        "DELETE FROM verification_codes WHERE email = ? AND type = ? LIMIT 1";
        const dbParams = [ email, type ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "somethink went wrong" );
        }
        return rows
    } catch ( error ) {
        return;
    }
}