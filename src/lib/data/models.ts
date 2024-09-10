'use server'
import { dbQuery } from "@/lib";

export const getModelsName = async ( id?: number ) => {
    try {
        let sql = `
        SELECT models.id, models.name, brand_id
        from models
        JOIN brand_models ON models.id = brand_models.model_id
        JOIN brands ON brand_models.brand_id = brands.id`;

        const dbParams: ( number | string | boolean )[] = [];
        if ( id !== -1 && id !== undefined ) {
            sql += " WHERE brand_id = ?";
            dbParams.push( id );
        }
        const [ rows, error ] = await dbQuery<filterOption[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        return rows
    } catch ( error ) {
        return;
    }
};


// export const getModelsNameFiltered = async ( brandId: number, search: string, priceMin: number | undefined, priceMax: number | undefined ) => {
//     try {
//         let sql = `
//         SELECT models.id, models.name, brand_id
//         from models
//         JOIN brand_models ON models.id = brand_models.model_id
//         JOIN brands ON brand_models.brand_id = brands.id`;

//         const dbParams: ( number | string | boolean )[] = [];
//         const conditions: string[] = [];

//         if ( brandId !== -1 && brandId !== undefined ) {
//             conditions.push( "brand_id = ?" );
//             dbParams.push( brandId );
//         }

//         if ( search ) {
//             conditions.push( "LOWER(models.name) LIKE LOWER(?)" );
//             dbParams.push( `%${search}%` );
//         }

//         if ( priceMin !== undefined && priceMax !== undefined ) {
//             conditions.push( "products.price BETWEEN ? AND ?" );
//             dbParams.push( priceMin, priceMax );
//         }

//         if ( conditions.length > 0 ) {
//             sql += " WHERE " + conditions.join( " AND " );
//         }
        
//         const [ rows, error ] = await dbQuery<filterOption[]>( sql, dbParams );
//         if ( error ) {
//             throw new Error( "Something went wrong" );
//         }
//         return rows
//     } catch ( error ) {
//         return;
//     }
// };
