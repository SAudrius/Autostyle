import { ResultSetHeader } from "mysql2";

import { dbQuery } from "../database/app";

export const getUserById = async ( id: string | number ) => {
    try {
        const dbParams = [ id ];
        const sql = "SELECT id, name, account_id, image, first_name, last_name, email, country, city, address, email_verified, email_pre_change, previous_email, email_user_limit, email_limit_time FROM users WHERE id = ? LIMIT 1";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<User[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows[0]
    } catch ( error ) {
        return;
    }
};
export const getUserWithPasswordById = async ( id: string | number ) => {
    try {
        const dbParams = [ id ];
        const sql = "SELECT id, name, account_id, image, first_name, last_name, email, country, city, address, email_verified, email_pre_change, previous_email, email_user_limit, email_limit_time, password FROM users WHERE id = ? LIMIT 1";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<UserWithPassword[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows[0]
    } catch ( error ) {
        return;
    }
};


export const getUserByEmail = async ( email: string ) => {
    try {
        const dbParams = [ email ];
        const sql = "SELECT * FROM users WHERE email = ?";
        const [ rows, error ] = await dbQuery<UserWithPassword[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows[0];
    } catch ( error ) {
        return;
    }
};


export const getUserDetailsById = async ( id: number | string ) => {
    try {
        const sql =
      "SELECT first_name, last_name, email, country, city, address FROM users WHERE id = ?";
        const dbParams = [ id ];
        const [ rows, error ] = await dbQuery<UserDetailsApi[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows[0];
    } catch ( error ) {
        return;
    }
};

export const getUserCountByEmail = async ( email: string ) => {
    try {
        const sql = 'SELECT COUNT(*) as count FROM users WHERE email = ?'
        const dbParams = [ email ];
        const [ count, error ] = await dbQuery<{ count: number }[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return count[0];
    } catch ( error ) {
        return;
    }
}


export const createUserByData = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string,
) => {
    try {
        const dbParams = [ first_name, last_name, email, password ];
        const sql =
      "INSERT INTO users ( first_name, last_name, email, password) VALUES (?,?,?,?)";
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
};

export const createGoogleUserByData = async (
    first_name: string,
    last_name: string,
    email: string,
    image: string,
) => {
    try {
        const provider = "google";
        const sql =
      "INSERT INTO users ( first_name, last_name, email, image) VALUES (?,?,?,?)";
        const dbParams = [ first_name, last_name, email, image ];
        // creating new user for google without password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        const createdUser = await getUserByEmail( email );
        if ( !createdUser ) {
            return;
        }
        // creating account for provider
        const sql2 = "INSERT INTO accounts (provider,user_id) VALUES (?,?)";
        const dbParams2 = [ provider, createdUser.id ];
        const [ rows2, error2 ] = await dbQuery<ResultSetHeader>( sql2, dbParams2 );
        if ( error2 ) {
            throw new Error( "Something went wrong" );
        }
        if ( rows2.affectedRows !== 1 ) {
            return;
        }
        return rows2;
    } catch ( error ) {
        return;
    }
};

export const updateUserEmailVerifiedById = async ( id: number ) => {
    try {
        const sql =
      "UPDATE users SET email_verified = 1 WHERE id = ?";
        const dbParams = [ id ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}

export const updateUserPasswordById = async ( newPassword: string, id:number ) => {
    try {
        const sql =
        "UPDATE users SET password = ? WHERE id = ?";
        const dbParams = [ newPassword, id ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}

export const updatePreChangeEmailByUserId = async ( userId: number, email: string ) => {
    try {
        const sql =
        "UPDATE users SET email_pre_change = ? WHERE id = ?";
        const dbParams = [ email, userId ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}

export const updateEmailByUserId = async ( userId: number, email: string, prevEmail: string ) => {
    try {
        const sql =
        "UPDATE users SET email = ?, previous_email = ? WHERE id = ?";
        const dbParams = [ email, prevEmail, userId ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}

export const updateUserDetailsById = async ( userId:number, first_name:string, last_name:string, country:string, city:string, address:string ) => {
    try {
        const sql =
        "UPDATE users SET first_name = ?, last_name = ?, country = ?, city = ?, address = ? WHERE id = ?";
        const dbParams = [ first_name, last_name, country, city, address, userId ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
} 

export const updateUserEmailExpireTimeById = async ( userId: number, expireTime: number ) => {
    try {
        const sql =
        "UPDATE users SET email_limit_time = ? WHERE id = ?";
        const dbParams = [ expireTime, userId ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}

export const updateUserEmailExpireLimitById = async ( userId: number, limit: number ) => {
    try {
        const sql =
        "UPDATE users SET email_user_limit = ? WHERE id = ?";
        const dbParams = [ limit, userId ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}

export const updateUserEmailExpireTimeAndEmailLimitById = async ( userId: number, expireTime: number, emailLimit: number ) => {
    try {
        const sql =
        "UPDATE users SET email_limit_time = ?, email_user_limit = ? WHERE id = ?";
        const dbParams = [ expireTime, emailLimit, userId ];
        const [ rows, error ] = await dbQuery<ResultSetHeader>( sql, dbParams );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows;
    } catch ( error ) {
        return;
    }
}