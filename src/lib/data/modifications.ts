'use server'
import { dbQuery } from "@/lib";

export const getModificationsName = async ( ) => {
    try {
        const sql = `SELECT modifications.id, modifications.name FROM modifications`;
        const [ rows, error ] = await dbQuery<Modification[]>( sql );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows
    } catch ( error ) {
        return;
    }
};

// export const getModificationsNameFiltered = async ( brandId: number, modelsId: number, search: string, priceMin: number | undefined, priceMax: number | undefined ) => {
//     try {
//         let sql = `
//             SELECT DISTINCT modifications.id, modifications.name, models.id as models_id FROM models
//             JOIN product_models ON models.id = product_models.car_id
//             JOIN products ON product_models.product_id = products.id
//             JOIN modifications ON products.modification_id = modifications.id
//         `;
//         const dbParams: ( number | string | boolean )[] = [];

//         const conditions: string[] = [];

//         if ( brandId !== -1 && brandId !== undefined ) {
//             sql += " WHERE brand_id = ?";
//             dbParams.push( brandId );
//         }

//         if ( modelsId !== undefined && modelsId !== -1 ) {
//             sql += " AND models.id = ?";
//             dbParams.push( modelsId );
//         }

//         if ( search ) {
//             conditions.push( "LOWER(products.name) LIKE LOWER(?)" );
//             dbParams.push( `%${search}%` );
//         }

//         if ( priceMin !== undefined && priceMax !== undefined ) {
//             conditions.push( "products.price BETWEEN ? AND ?" );
//             dbParams.push( priceMin, priceMax );
//         }

//         if ( conditions.length > 0 ) {
//             sql += " WHERE " + conditions.join( " AND " );
//         }

//         console.log( 'sql ===', sql );
//         const [ rows, error ] = await dbQuery<Modification[]>( sql, dbParams );
//         if ( error ) {
//             throw new Error( "Something went wrong" );
//         }
//         return rows
//     } catch ( error ) {
//         return;
//     }
// };

export const getModificationsNameByBrandIdAndModelsId = async ( brandId: number, modelsId: number ) => {
    try {
        let sql = `
            SELECT modifications.id, modifications.name FROM products
            JOIN modifications ON products.modification_id = modifications.id
            JOIN product_models ON products.id = product_models.product_id
            JOIN models ON product_models.car_id = models.id`;

        const dbParams: ( number | string | boolean )[] = [];

        if ( brandId !== -1 && brandId !== undefined ) {
            sql += " WHERE brand_id = ?";
            dbParams.push( brandId );
        }
        if ( modelsId !== undefined && modelsId !== -1 ) {
            sql += " AND models.id = ?";
            dbParams.push( modelsId );
        }
        console.log( 'sql ===', sql );
        const [ rows, error ] = await dbQuery<Modification[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows
    } catch ( error ) {
        return;
    }
};
