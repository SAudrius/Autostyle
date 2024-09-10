'use server'

import { validatePaginationParams } from "@/config";
import { dbQuery } from "@/lib";

import { SortOptions } from "../store/slices/filtersSlice";

export const getInitialProductsData = async () => {
    try {
        let sql = `
        SELECT products.id, products.name, products.description, price, discount_price, stock, brands.name as brand_name, models.name as car_name, models.year as car_year 
        FROM products
        JOIN brands ON products.brand_id = brands.id
        JOIN product_models ON products.id = product_models.id 
        JOIN models ON product_models.car_id = models.id
        `
        sql += " ORDER BY products.id";
        sql += " LIMIT 6;";
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<SearchProductApi[]>( sql );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        const productsData: SearchProduct[] = rows.map( row => ( {
            ...row,
            brandName: row.brand_name,
            carName: row.car_name,
            carYear: row.car_year,
        } ) );

        return productsData
    } catch ( error ) {
        return;
    }
}

export const getInitialSearchProductsData = async () => {
    try {
        const sql = `
        SELECT products.id, products.name, products.description, price, discount_price, stock, brands.name as brand_name, models.name as car_name, models.year as car_year 
        FROM products
        JOIN brands ON products.brand_id = brands.id
        JOIN product_models ON products.id = product_models.id 
        JOIN models ON product_models.car_id = models.id
        ORDER BY products.id
        LIMIT 4
        `
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<SearchProductApi[]>( sql );
        console.log( 'rows ===', rows );
        console.log( 'error ===', error );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        const productsData: SearchProduct[] = rows.map( row => ( {
            ...row,
            brandName: row.brand_name,
            carName: row.car_name,
            carYear: row.car_year,
        } ) );

        return productsData
    } catch ( error ) {
        return;
    }
}

export const getFilteredProductsData = async ( search: string, brandId: number, modelId: number, modificationId: number, priceMin: number | undefined, priceMax: number | undefined, sort: SortOptions ) => {
    try {
        let sql = `
        SELECT products.id, products.name, products.description, price, discount_price, stock, brands.name as brand_name, models.name as car_name, models.year as car_year 
        FROM products
        JOIN brands ON products.brand_id = brands.id
        JOIN product_models ON products.id = product_models.id 
        JOIN models ON product_models.car_id = models.id`
        
        const conditions: string[] = [];
        const dbParams: ( string | number )[] = [];

        if ( search ) {
            conditions.push( "LOWER(products.name) LIKE LOWER(?)" );
            dbParams.push( `%${search}%` );
        }

        if ( brandId !== -1 ) {
            conditions.push( "products.brand_id = ?" );
            dbParams.push( brandId );
        }

        if ( modelId !== -1 ) {
            conditions.push( "models.id = ?" );
            dbParams.push( modelId );
        }

        if ( modificationId !== -1 ) {
            conditions.push( "products.modification_id = ?" );
            dbParams.push( modificationId );
        }

        if ( priceMin !== undefined && priceMax !== undefined ) {
            conditions.push( "products.price BETWEEN ? AND ?" );
            dbParams.push( priceMin, priceMax );
        }

        if ( conditions.length > 0 ) {
            sql += " WHERE " + conditions.join( " AND " );
        }

        switch ( sort ) {
        case SortOptions.ALPHABET:
            sql += " ORDER BY products.name ASC";
            break;
        case SortOptions.PRICE_ASC:
            sql += " ORDER BY products.price ASC";
            break;
        case SortOptions.PRICE_DESC:
            sql += " ORDER BY products.price DESC";
            break;
        default:
            sql += " ORDER BY products.id"; // Default sorting by product ID
            break;
        }

        sql += " LIMIT 7;";

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<SearchProductApi[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        
        const productsData: SearchProduct[] = rows.map( row => ( {
            ...row,
            brandName: row.brand_name,
            carName: row.car_name,
            carYear: row.car_year,
        } ) );
        return productsData
    } catch ( error ) {
        return;
    }
}

export const getFilteredProductsDataFromTo = async ( search: string, brandId: number, modelId: number, modificationId: number, priceMin: number | undefined, priceMax: number | undefined, sort: SortOptions, hiddenProductsCount: number ) => {
    try {
        const offset = validatePaginationParams( hiddenProductsCount, 0 );
        let sql = `
        SELECT products.id, products.name, products.description, price, discount_price, stock, brands.name as brand_name, models.name as car_name, models.year as car_year 
        FROM products
        JOIN brands ON products.brand_id = brands.id
        JOIN product_models ON products.id = product_models.id 
        JOIN models ON product_models.car_id = models.id`;
        
        const conditions: string[] = [];
        const dbParams: ( string | number )[] = [];

        if ( search ) {
            conditions.push( "LOWER(products.name) LIKE LOWER(?)" );
            dbParams.push( `%${search}%` );
        }

        if ( brandId !== -1 ) {
            conditions.push( "products.brand_id = ?" );
            dbParams.push( brandId );
        }

        if ( modelId !== -1 ) {
            conditions.push( "models.id = ?" );
            dbParams.push( modelId );
        }

        if ( modificationId !== -1 ) {
            conditions.push( "products.modification_id = ?" );
            dbParams.push( modificationId );
        }

        if ( priceMin !== undefined && priceMax !== undefined ) {
            conditions.push( "products.price BETWEEN ? AND ?" );
            dbParams.push( priceMin, priceMax );
        }

        if ( conditions.length > 0 ) {
            sql += " WHERE " + conditions.join( " AND " );
        }

        switch ( sort ) {
        case SortOptions.ALPHABET:
            sql += " ORDER BY products.name ASC";
            break;
        case SortOptions.PRICE_ASC:
            sql += " ORDER BY products.price ASC";
            break;
        case SortOptions.PRICE_DESC:
            sql += " ORDER BY products.price DESC";
            break;
        default:
            sql += " ORDER BY products.id"; // Default sorting by product ID
            break;
        }
        console.log( "bEFORE" )
        // Ensure these values are valid numbers
        if ( typeof hiddenProductsCount === 'number' ) {
            sql += ` LIMIT 7 OFFSET ${offset}`
        } else {
            throw new Error( 'Invalid count or offset values' );
        }
        console.log( 'SQL', sql )
        console.log( 'dbParams ===', dbParams );
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [ rows, error ] = await dbQuery<SearchProductApi[]>( sql, dbParams );
        console.log( 'error ===', error );
        
        if ( error ) {
            throw new Error( "Something went wrong" );
        }
        const productsData: SearchProduct[] = rows.map( row => ( {
            ...row,
            brandName: row.brand_name,
            carName: row.car_name,
            carYear: row.car_year,
        } ) );
        return productsData
    } catch ( error ) {
        console.log( 'error ===', error );
        return;
    }
}

export const getFilteredProductsBySearch = async ( search: string ) => {
    try {
        let sql = `
        SELECT products.id, products.name, products.description, price, discount_price, stock, brands.name as brand_name, models.name as car_name, models.year as car_year 
        FROM products
        JOIN brands ON products.brand_id = brands.id
        JOIN product_models ON products.id = product_models.id 
        JOIN models ON product_models.car_id = models.id`;

        const dbParams: ( string | number )[] = [];

        if ( search ) {
            sql += " WHERE LOWER(products.name) LIKE LOWER(?)";
            dbParams.push( `%${search}%` );
        }

        sql += " ORDER BY products.name ASC LIMIT 4;";

        const [ rows, error ] = await dbQuery<SearchProductApi[]>( sql, dbParams );
        if ( error ) {
            throw new Error( "Something went wrong" );
        }

        const productsData: SearchProduct[] = rows.map( row => ( {
            ...row,
            brandName: row.brand_name,
            carName: row.car_name,
            carYear: row.car_year,
        } ) );

        return productsData;
    } catch ( error ) {
        console.error( "Error fetching filtered products:", error );
        return;
    }
};