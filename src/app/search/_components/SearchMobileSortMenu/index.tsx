'use client'
import React from 'react'

import { CancelIcon, Line } from '@/components'
import { cn, nunito } from '@/config'
import { searchAnimateOff, searchSortOff, turnModalOff, useAppDispatch, useAppSelector } from '@/lib'
import { sortProductsAlphabetically, sortProductsPriceAscending, sortProductsPriceDescending } from '@/lib/store/slices/filtersSlice'

export const SearchMobileSortMenu = () => {
    const dispatch = useAppDispatch()
    const searchSortMenu = useAppSelector( ( state ) => state.search.searchSort )
    const searchAnimation = useAppSelector( ( state ) => state.search.searchAnimation )

    const handleClickSortOff = () => {
        turnModalOff( dispatch, [ searchSortOff, searchAnimateOff ] )
    }
    const handleSortAlphabet = () => {
        dispatch( sortProductsAlphabetically() )
        turnModalOff( dispatch, [ searchSortOff, searchAnimateOff ] )
    }
    const handleSortPriceAcscending = () => {
        dispatch( sortProductsPriceAscending() )
        turnModalOff( dispatch, [ searchSortOff, searchAnimateOff ] )

    }
    const handleSortPriceDescending = () => {
        dispatch( sortProductsPriceDescending() )
        turnModalOff( dispatch, [ searchSortOff, searchAnimateOff ] )
    }

    return (
        <div className={cn( 'absolute bg-white h-[220px] top-[calc(100vh_-_80px_-220px)] w-full py-6 transition duration-300', 
            { "-z-20": !searchSortMenu },
            { "z-40": searchSortMenu, },
            { "translate-y-[0px]" : searchAnimation },
            { "translate-y-[350px]" : !searchAnimation },
        )}>
            <div className="container-v2 text-center relative">
                <CancelIcon
                    className="cursor-pointer absolute right-[16px] mt-[2px] sm:right-[24px]"
                    onClick={handleClickSortOff}
                    ariaLabel="Close menu"
                />
                <p className={cn( 'uppercase tracking-wide-20', nunito.className )}>Sort</p>
                <Line className='mt-6'/>
                <button type='button' onClick={handleSortAlphabet} className='block mt-6 text-sm uppercase tracking-wide-10'>ALPHABET</button>
                <button type='button' onClick={handleSortPriceAcscending} className='block mt-4 text-sm uppercase tracking-wide-10'>PRICE ASCENDING</button>
                <button type='button' onClick={handleSortPriceDescending} className='block mt-4 text-sm uppercase tracking-wide-10'>PRICE DESCENDING</button>
            </div>
        </div>
    )
}
