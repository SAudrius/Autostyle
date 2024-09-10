import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { Line, SingleProductCardSmall, SingleProductCardSmallLoadingSkeleton  } from '@/components'
import { cn } from '@/config'
import { getFilteredProductsBySearch, getInitialSearchProductsData, useAppSelector  } from '@/lib'

interface SearchBarProductsProps {
    onClose: () => void
}

export const SearchBarProducts = ( { onClose }:SearchBarProductsProps ) => {
    const [ visibleProductCount, setVisibleProductCount ] = useState( 4 )
    const [ error, setError ] = useState( '' )
    const [ loading, setLoading ] = useState( false )
    const searchString = useAppSelector( ( state ) => state.filters.searchString )
    const [ productsData, setProductsData ] = useState<SearchProduct[]>( [] )

    const serchInitialProductsResponse = async ( searchStringValue: string ) => {
        if ( searchStringValue ) {
            return
        }
        setLoading( true )
        const searchProductsActionResponse = await getInitialSearchProductsData()
        if ( !searchProductsActionResponse ) {
            setError( 'Something went wrong' )
            setLoading( false )
            return
        }
        setProductsData( searchProductsActionResponse )
        setLoading( false )
    }

    const serchFitleredProductsResponse = async ( searchStringValue: string ) => {
        if ( !searchStringValue ) {
            return
        }
        setLoading( true )
        const searchProductsActionResponse = await getFilteredProductsBySearch( searchStringValue )
        if ( !searchProductsActionResponse ) {
            setError( 'Something went wrong' )
            setLoading( false )
            return
        }
        if ( searchProductsActionResponse.length < 1 ) {
            setVisibleProductCount( 0 )
        } else {
            setVisibleProductCount( searchProductsActionResponse.length )
        }
        setProductsData( searchProductsActionResponse )
        setLoading( false )

    }
    
    useEffect( () => {
        serchInitialProductsResponse( searchString )
    }, [ searchString ] )

    useEffect( () => {
        serchFitleredProductsResponse( searchString )
    }, [ searchString ] )

    return (
        <>
            <h2 className={cn( 'mt-8 text-[12px] uppercase tracking-wide-20' )}>Products</h2>
            <Line className='mt-6'/>
            <div className='grid grid-cols-2 gap-4 mt-6'>
                {!loading && !error && productsData.map( ( product, index ) => <SingleProductCardSmall key={`${product.id}-${product.name}-${index}`} productImgUrl='' 
                    name={product.name} year={product.carYear} brand={product.brandName} model={product.carName} price={product.price}
                /> )}
                {loading && !error && <>
                    <SingleProductCardSmallLoadingSkeleton/>
                    <SingleProductCardSmallLoadingSkeleton/>
                    <SingleProductCardSmallLoadingSkeleton/>
                    <SingleProductCardSmallLoadingSkeleton/>
                </>}  
            </div>
            {visibleProductCount > 0 && (
                <Link
                    href='/search'
                    onClick={onClose}
                    className='container-v2 text-center uppercase underline tracking-wide-10 text-[12px] leading-4 pt-8 col-span-2 grid'
                >
                Show more
                </Link>
            )}
            {visibleProductCount === 0 && (
                <p className='container-v2 text-center uppercase tracking-wide-10 text-[12px] leading-4 pt-7 col-span-2 grid mt-20'>
                No results
                </p>
            )}
        </>
    )
}
