'use client'
import React from 'react'

import { CancelIcon, Line } from '@/components'
import { cn, nunito } from '@/config'
import { searchAnimateOff, searchMobileFilterOff, searchSortOff, turnModalOff, useAppDispatch, useAppSelector } from '@/lib'

import { FilterPrice } from '../FilterPrice'
import { MainFilter } from '../MainFilter'

export const SearchMobileFiltersMenu = () => {
    const searchFilterMenu = useAppSelector( ( state ) => state.search.searchFilter )
    const searchAnimation = useAppSelector( ( state ) => state.search.searchAnimation )
    const searchMobileFilter = useAppSelector( ( state ) => state.search.searchMobileFilter )
    const dispatch = useAppDispatch()
    
    const handleClickFilterOff = () => {
        turnModalOff( dispatch, [ searchSortOff, searchAnimateOff ] )
        setTimeout( () => { dispatch( searchMobileFilterOff() ) }, 300 )
    }

    return (
        <div className={cn( 'absolute bg-shade h-[calc(100vh_-_48px_)] top-[48px] w-full py-6 transition duration-300 md:hidden', 
            { "-z-20": !searchFilterMenu },
            { "z-40": searchFilterMenu, },
            { "translate-y-[0px]" : searchAnimation },
            { "translate-y-[calc(100vh_-_48px_)]" : !searchAnimation },
            { "block" : searchMobileFilter },
            { "hidden" : !searchMobileFilter },
        )}>
            <div className="container-v2 text-center relative">
                <CancelIcon
                    className="cursor-pointer absolute right-[16px] mt-[2px] sm:right-[24px]"
                    onClick={handleClickFilterOff}
                    ariaLabel="Close menu"
                />
                <p className={cn( 'uppercase tracking-wide-20', nunito.className )}>Filters</p>
                <Line className='mt-6'/>
                <MainFilter className='mt-6'/>
                <FilterPrice version='mobile'/>
            </div>
        </div>
    )
}

