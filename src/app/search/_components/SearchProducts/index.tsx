import React, { Suspense } from 'react'

import { Line } from '@/components'
import { cn } from '@/config'

import { ProductsLoadingSkeleton } from '../../_skeletons/ProductsLoadingSkeleton'
import { SearchProductsShowMore } from '../SearchPorductsShowMore'
import { SearchProductsListWithSuspense } from '../SearchProductsListWithSuspense'

interface SearchProductsProps {
    className?: string
}

export const SearchProducts = async ( { className }: SearchProductsProps ) => {
    return (
        <div className={cn( '', className )}>
            <h2 className={cn( 'mt-8 text-[12px] uppercase tracking-wide-20' )}>Products</h2>
            <Line className='mt-4'/>
            <Suspense fallback={<ProductsLoadingSkeleton className='mt-6 md:mt-8' />}>
                <SearchProductsListWithSuspense /> 
            </Suspense>
            <SearchProductsShowMore/>
        </div>
    )
}
