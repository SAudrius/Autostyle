import { dbQuery } from "@lib/database/app";
import { ResultSetHeader } from "mysql2";

export const createVerificationTokenByEmail = async ( email: string, token: string, type: 'password' | 'email' ) => {
    try {
        const sql =
        "INSERT INTO verification_tokens (email, token, type) VALUES (?,?, ?)";
        const dbParams = [ email, token, type ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "somethink went wrong" );
        }

        return rows;
    } catch ( error ) {
        return;
    }
};

export const getVerificationTokenByEmail = async ( email: string, type: 'password' | 'email' ) => {
    try {
        const sql =
        "SELECT * FROM verification_tokens WHERE email = ? AND type = ?";
        const dbParams = [ email, type ];
        console.log( 'email ===', email );
        console.log( 'type ===', type );
        const [ rows, error ] = await dbQuery<VerificationToken[]>( sql, dbParams );
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

export const getVerificationTokenByToken = async ( token: string ) => {
    try {
        const sql =
        "SELECT * FROM verification_tokens WHERE token = ?";
        const dbParams = [ token ];
        const [ rows, error ] = await dbQuery<VerificationToken[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "somethink went wrong" );
        }
        return rows[0]
    } catch ( error ) {
        return 
    }
}

export const deleteVerificationTokenById = async ( id: number ) => {
    try {
        const sql =
        "DELETE FROM verification_tokens WHERE id = ? LIMIT 1";
        const dbParams = [ id ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "somethink went wrong" );
        }
        return rows
    } catch ( error ) {
        return;
    }
}

export const deleteVerificationTokenByEmail = async ( email: string, type: 'password' | 'email' ) => {
    try {
        const sql =
        "DELETE FROM verification_tokens WHERE email = ? AND type = ?LIMIT 1";
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
