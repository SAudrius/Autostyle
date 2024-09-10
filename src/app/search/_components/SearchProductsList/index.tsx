'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { SingleProductCard } from '@/components'
import { cn } from '@/config'
import { getFilteredProductsData, getFilteredProductsDataFromTo, setHiddenProductsCount, setProductsLoading, setVisibleProductsCount, SortOptions, useAppSelector   } from '@/lib'

import { ProductLoadingSkeleton } from '../../_skeletons/ProductLoadingSkeleton'

interface SearchProductsListProps {
    products: SearchProduct[]
}

export const SearchProductsList = ( { products }: SearchProductsListProps ) => {
    
    useEffect( () => {
        // Set productsData and visibleProductsData when products prop changes
        setProductsData( products );
        setVisibleProductsData( products );
    }, [ products ] );

    
    const dispatch = useDispatch()
    const visibleProductsCount = useAppSelector( ( state ) => state.filters.visibleProductsCount )
    const hiddenProductsCount = useAppSelector( ( state ) => state.filters.hiddenProductsCount )
    const productsLoading = useAppSelector( ( state ) => state.filters.productsLoading )
    const searchGrid = useAppSelector( ( state ) => state.search.searchGrid )
    
    const [ firstLoad, setFirstLoad ] = useState( false )
    const [ cancelShowMoreFirstLoad, setCancelShowMoreFirstLoad ] = useState( true )
    const [ loading, setLoading ] = useState( false )
    const [ loadingFilter, setLoadingFilter ] = useState( false )
    const [ error, setError ] = useState( '' )
    const [ productsData, setProductsData ] = useState<SearchProduct[]>()
    const [ visibleProductsData, setVisibleProductsData ] = useState<SearchProduct[]>( [] )

    const searchString = useAppSelector( ( state ) => state.filters.searchString )
    const selectedBrandId = useAppSelector( ( state ) => state.filters.brandSelectedId )
    const selectedModelId = useAppSelector( ( state ) => state.filters.modelSelectedId )
    const selectedModificationId = useAppSelector( ( state ) => state.filters.modificationSelectedId )
    const priceMin = useAppSelector( ( state ) => state.filters.priceMinValue )
    const priceMax = useAppSelector( ( state ) => state.filters.priceMaxValue )
    const sort = useAppSelector( ( state ) => state.filters.sort )

    const filteredProductResponse = ( search: string, brandId: number, modelId: number, modificationId: number, priceMin: number | undefined, priceMax: number | undefined, sort: SortOptions ) => {
        setLoadingFilter( true )
        setFirstLoad( true )
        dispatch( setProductsLoading( true ) )

        const filteredProductsActionResponse = async () => {
            // Set server side products on first load
            if( !productsData ) {
                setProductsData( products )
                setLoadingFilter( false )
                setFirstLoad( false )
                dispatch( setProductsLoading( false ) )

                // Remove server data if exist
                const initilaProductsElementId = document.getElementById( 'intialProducts' );
                if ( initilaProductsElementId ) {
                    initilaProductsElementId.style.display = 'none';
                }
                return
            }
            const filteredProductsActionData = await getFilteredProductsData( search, brandId, modelId, modificationId, priceMin, priceMax, sort )
            if ( !filteredProductsActionData )  {
                dispatch( setProductsLoading( false ) )
                setLoadingFilter( false )
                setFirstLoad( false )
                setVisibleProductsData( [] )
                setProductsData( [] )
                setError( 'Something went wrong' )
                return
            }

            setProductsData( filteredProductsActionData );
            setVisibleProductsData( filteredProductsActionData.slice( 0, visibleProductsCount ) )
            setCancelShowMoreFirstLoad( true )
            dispatch( setVisibleProductsCount( 6 ) )
            dispatch( setHiddenProductsCount( filteredProductsActionData.length ) )

            const initilaProductsElementId = document.getElementById( 'intialProducts' );
            if ( initilaProductsElementId ) {
                initilaProductsElementId.style.display = 'none';
            }

            dispatch( setProductsLoading( false ) )
            setLoadingFilter( false )
            setFirstLoad( false )
        }
        filteredProductsActionResponse() 
    }

    const showMoreProductResponse = ( search: string, brandId: number, modelId: number, modificationId: number, priceMin: number | undefined, priceMax: number | undefined, sort: SortOptions, hiddenProductsCount: number ) => {

        if ( cancelShowMoreFirstLoad ) {
            setCancelShowMoreFirstLoad( false )
            return
        }
        setLoading( true )

        const showMoreProductResponse = async () => {
            dispatch( setProductsLoading( true ) )

            if( !productsData ) {
                setProductsData( products )
                setLoading( false )
                dispatch( setProductsLoading( false ) )
                return
            }
            const filteredProductsActionData = await getFilteredProductsDataFromTo( search, brandId, modelId, modificationId, priceMin, priceMax, sort, hiddenProductsCount )
            if ( !filteredProductsActionData ) {
                setVisibleProductsData( [] )
                setProductsData( [] )
                setLoading( false )
                dispatch( setProductsLoading( false ) )
                setError( 'Something went wrong' )
                return
            }

            setProductsData( ( prevState ) => [ ...( prevState ?? [] ), ...filteredProductsActionData.slice( 0, 6 ) ] );
            setVisibleProductsData( ( prevState ) => [ ...( prevState ?? [] ), ...filteredProductsActionData.slice( 0, 6 ) ] )
            dispatch( setHiddenProductsCount( productsData.length + filteredProductsActionData.length ) )

            const initilaProductsElementId = document.getElementById( 'intialProducts' );
            if ( initilaProductsElementId ) {
                initilaProductsElementId.style.display = 'none';
            }
            setLoading( false )
            dispatch( setProductsLoading( false ) )

        }
        showMoreProductResponse() 
    }

    useEffect( () => {
        filteredProductResponse( searchString, selectedBrandId, selectedModelId, selectedModificationId, priceMin, priceMax, sort )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ searchString, selectedBrandId, selectedModelId, selectedModificationId, priceMin, priceMax, sort ] )

    useEffect( () => {
        showMoreProductResponse( searchString, selectedBrandId, selectedModelId, selectedModificationId, priceMin, priceMax, sort, hiddenProductsCount )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ visibleProductsCount ] )



    return (
        <>
            <div id='intialProducts' className={cn( 'grid gap-6 mt-6 md:gap-8 md:mt-8', 
                { 'grid-cols-1 lg:grid-cols-2': searchGrid === 'small' },
                { 'grid-cols-2 lg:grid-cols-3': searchGrid === 'big' }
            )}>
                { products.map( ( product ) => <SingleProductCard key={product.id} productImgUrl='' 
                    name={product.name} year={product.carYear} brand={product.brandName} model={product.carName} price={product.price}
                /> )}
            </div>
            <div className={cn( 'grid gap-6 mt-6 md:gap-8 md:mt-8', 
                { 'grid-cols-1 lg:grid-cols-2': searchGrid === 'small' },
                { 'grid-cols-2 lg:grid-cols-3': searchGrid === 'big' }
            )}>
                { loadingFilter && firstLoad && 
                <>
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                </>
                }
                { !loadingFilter && productsData && visibleProductsData?.map( ( product, index ) => 
                    <SingleProductCard key={`${product.id}-${product.name}-${index}`} productImgUrl='' 
                        name={product.name} year={product.carYear} brand={product.brandName} model={product.carName} price={product.price}
                    /> 
                )}
                {loading && !firstLoad &&<>
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                    <ProductLoadingSkeleton />
                </>}
            </div>
            {!error && <div className={cn( 'justify-center items-center h-[600px] hidden', { productsLoading: 'hidden' }, { 'flex': !productsLoading && !hiddenProductsCount } )}>
                <p className={cn( 'text-center' )}>No results found</p>
            </div>}
            {error && !loading && !loadingFilter && <div className={cn( 'justify-center items-center h-[600px] flex' )}>
                <p className={cn( 'text-center' )}>Something went wrong</p>
            </div>}
        </>
    )
}
