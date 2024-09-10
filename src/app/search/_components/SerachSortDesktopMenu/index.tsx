'use cliet'
import React from 'react'

import { cn } from '@/config'
import { useAppDispatch } from '@/lib'
import { sortProductsAlphabetically, sortProductsPriceAscending, sortProductsPriceDescending } from '@/lib/store/slices/filtersSlice'

interface SearchDekstopSortMenuProps {
    searchDesktopSort: boolean
}

export const SearchSortDesktopMenu = ( { searchDesktopSort }: SearchDekstopSortMenuProps ) => {
    const dispatch = useAppDispatch()

    const handleSortAlphabet = () => {
        dispatch( sortProductsAlphabetically() )
    }
    const handleSortPriceAcscending = () => {
        dispatch( sortProductsPriceAscending() )

    }
    const handleSortPriceDescending = () => {
        dispatch( sortProductsPriceDescending() )
    }

    return (
        <div className={cn( 'w-[300px] absolute top-[50px] right-0 transition-height-visibility-css overflow-hidden h-0', 
            { 'block h-[200px]':searchDesktopSort }, 
            { 'h-0': !searchDesktopSort } )
        }>
            <div className='p-8 bg-white shadow-lg'>
                <button type='button' onClick={handleSortAlphabet} className='block text-sm uppercase tracking-wide-10'>ALPHABET</button>
                <button type='button' onClick={handleSortPriceAcscending} className='block mt-4 text-sm uppercase tracking-wide-10'>PRICE ASCENDING</button>
                <button type='button' onClick={handleSortPriceDescending} className='block mt-4 text-sm uppercase tracking-wide-10'>PRICE DESCENDING</button>
            </div>
        </div>
    )
}
