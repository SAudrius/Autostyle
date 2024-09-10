import React, { Suspense } from 'react'

import { Line } from '@/components'
import { cn } from '@/config'

import { MainFilterLoadingSkeleton } from '../../_skeletons/MainFilterLoadingSkeleton'
import { FilterPrice } from '../FilterPrice'
import { MainFilterWithSuspnse } from '../MainFilterWithSuspense'

interface SearchFiltersProps {
    className?: string
}

export const SearchFilters = ( { className }: SearchFiltersProps ) => {
    return (
        <div className={cn( "", className )}>
            <div className='sticky top-12 py-8'>
                <h2 className={cn( 'text-[12px] uppercase tracking-wide-20' )}>Filters</h2>
                <Line className='mt-4'/>
                <Suspense fallback={<MainFilterLoadingSkeleton/>}>
                    <MainFilterWithSuspnse />
                </Suspense>
                <FilterPrice version='desktop'/>
            </div>
        </div>
    )
}
