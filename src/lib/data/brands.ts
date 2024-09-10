'use server'
import { dbQuery } from "../database";

export const getBrandsName = async ( ) => {
    try {
        const sql = "SELECT id, name FROM brands";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<filterOption[]>( sql );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows
    } catch ( error ) {
        return;
    }
};
