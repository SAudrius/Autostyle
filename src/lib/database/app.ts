"use server";
import mysql from "mysql2/promise";

// import { dbConfigRemote } from "./config";

type QueryRes<T> = [T, null] | [null, Error];

export const dbQuery = async <T>(
    sql: string,
    valuesArr: ( string | number | boolean )[] = [],
): Promise<QueryRes<T>> => {
    let conn;
    try {
        conn = await mysql.createConnection( {
            host: process.env.TIDB_HOST,
            user: process.env.TIDB_USER,
            password: process.env.TIDB_PASSWORD,
            database: process.env.TIDB_DATABASE,
            port: parseInt( process.env.TIDB_PORT || "4000" ),
            ssl: {
                rejectUnauthorized: true,
            },
        } );
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const [ res, _fields ] = await conn.execute( sql, valuesArr );
        return [ res as T, null ];
    } catch ( err ) {
        return [ null, err as Error ];
    } finally {
        if ( conn ) conn.end();
    }
};
