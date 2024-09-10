'use client'
import React, { useEffect, useState } from 'react'

import { cn } from '@/config'
import { getBrandsName, getModelsName, getModificationsNameByBrandIdAndModelsId, useAppDispatch, useAppSelector  } from '@/lib';
import { setBrandSelectedId, setBrandSelectedName, setModelSelectedId, setModelSelectedName, setModificationSelectedId, setModificationSelectedName, setProductsLoading } from '@/lib/store/slices/filtersSlice';

import { SearchSelect } from '../SearchSelect';

interface MainFilterProps {
    className?: string
    brands?: filterOption[]
}

export const MainFilter = ( { className, brands } : MainFilterProps ) => {
    const dispatch = useAppDispatch()
    const [ error, setError ] = useState( '' )

    const selectedBrandId = useAppSelector( ( state ) => state.filters.brandSelectedId )
    const selectedBrandName = useAppSelector( ( state ) => state.filters.brandSelectedName )
    const [ brandsData, setBrandsData ] = useState<filterOption[]>( [] )
    const [ brandsVisibleData, setBrandsVisibleData ] = useState<filterOption[]>( [] )

    const selectedModelId = useAppSelector( ( state ) => state.filters.modelSelectedId )
    const selectedModelName = useAppSelector( ( state ) => state.filters.modelSelectedName )
    const [ modelsOptions, setModelsOptions ] = useState<filterOption[]>( [ ] );
    const [ displayedModelsOptions, setDisplayedModelsOptions ] = useState<filterOption[]>( [] );

    // const selectedModificationId = useAppSelector( ( state ) => state.filters.modificationSelectedId )
    const selectedModificationName = useAppSelector( ( state ) => state.filters.modificationSelectedName )
    const [ modificationsOptions, setModificationsOptions ] = useState<filterOption[]>( [] );
    const [ displayedModificationsOptions, setDisplayedModificationsOptions ] = useState<filterOption[]>( [] );

    const brandOptionsResponse = () => {
        const brandsActionResponse = async () => {
            const brandsActionData = await getBrandsName()
            if ( !brandsActionData )  {
                setError( 'Something went wrong' )
                return
            }
            setBrandsData( brandsData )
            setBrandsVisibleData( brandsActionData );
        }
        brandsActionResponse()
    }

    const modelOptionsResponse = ( id: number ) => {
        const modelsActionResponse = async () => {
            const modelsActionData = await getModelsName( id )
            if ( !modelsActionData )  {
                setError( 'Something went wrong' )
                return
            }
            setModelsOptions( modelsActionData )
            setDisplayedModelsOptions( modelsActionData );
        }
        modelsActionResponse()
    }

    const modificationFilteredOptionsResponse = ( brandId: number, modificationId: number ) => {
        console.log( 'filtered' )
        const productsActionResponse = async () => {
            const modificationsActionData = await getModificationsNameByBrandIdAndModelsId( brandId, modificationId )
            if ( !modificationsActionData )  {
                setError( 'Something went wrong' )
                return
            }
            setModificationsOptions( modificationsActionData );
            setDisplayedModificationsOptions( modificationsActionData );
        }
        productsActionResponse()
    }

    const handleBrandSelected = ( index: number, name: string ) => {
        dispatch( setProductsLoading ( true ) )
        dispatch( setModelSelectedId( -1 ) )
        dispatch( setModelSelectedName( 'Select Model' ) )
        dispatch( setBrandSelectedId( index ) )
        dispatch( setBrandSelectedName( name ) )
    }

    const handleModelSelected = ( index: number, name: string ) => {
        dispatch( setModelSelectedId( index ) )
        dispatch( setModelSelectedName( name ) )

        setDisplayedModelsOptions( modelsOptions.filter( ( option ) => option.id !== index ) );
    }

    const handleModificationSelected = ( index: number, name: string ) => {
        dispatch( setModificationSelectedId( index ) )
        dispatch( setModificationSelectedName( name ) )

        setDisplayedModificationsOptions( modificationsOptions.filter( ( option ) => option.id !== index ) );
    }

    useEffect( () => {
        if ( brands ) {
            return
        }
        brandOptionsResponse()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    useEffect( () => {
        console.log( "@BRAND" )
        modelOptionsResponse( selectedBrandId )
        dispatch( setModelSelectedId( -1 ) )
        dispatch( setModelSelectedName( 'Select Model' ) )

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ selectedBrandId ] )

    useEffect( () => {
        console.log( "@MODEL" )
        if ( selectedBrandId !== -1 && selectedModelId !== -1 ) {
            modificationFilteredOptionsResponse( selectedBrandId, selectedModelId )
        }
        dispatch( setModificationSelectedId( -1 ) )
        dispatch( setModificationSelectedName( 'Select Modification' ) )
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ selectedModelId ] )


    return (
        <div className={cn( 'bg-neutral-800 p-4 rounded grid gap-4', className )}>
            {!error && <>
                <SearchSelect options={brands || brandsVisibleData} setSelectedOption={handleBrandSelected} selectedName={selectedBrandName} />
                <SearchSelect options={displayedModelsOptions} setSelectedOption={handleModelSelected} selectedName={selectedModelName} hidden={selectedBrandId === -1 ? true : false} hiddenMessage="Please Select a Brand First"/>
                <SearchSelect options={displayedModificationsOptions} setSelectedOption={handleModificationSelected} selectedName={selectedModificationName} hidden={selectedModelId === -1 ? true : false} hiddenMessage="Please Select a Model First"/>
            </> }
            {error && <p className='text-red-50 bg-neutral-800 px-4 text-center'>{error}</p>}
        </div>
    )
}
