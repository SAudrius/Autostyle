'use client'
import React from 'react'

import { Line } from '@/components'
import { showMoreVisibleProducts, useAppDispatch, useAppSelector  } from '@/lib'

export const SearchProductsShowMore = () => {
    const dispatch = useAppDispatch()
    const visibleProductsCount = useAppSelector( ( state ) => state.filters.visibleProductsCount )
    const productsLoading = useAppSelector( ( state ) => state.filters.productsLoading )
    const hiddenProductsCount = useAppSelector( ( state ) => state.filters.hiddenProductsCount )
    const handleShowMore = () => {
        dispatch( showMoreVisibleProducts() )
    }
    return (
        <div> 
            { visibleProductsCount < hiddenProductsCount && !productsLoading &&
             <>
                 <div className='flex justify-center mt-6 md:mt-8'>
                     <button type='button' onClick={handleShowMore} className='uppercase underline tracking-wide-10 text-[12px] leading-4'>More Products</button>
                 </div>
                 <Line className='mt-6 md:mt-8'/>
             </>
            }
            {visibleProductsCount >= hiddenProductsCount && <>
                <Line className='mt-6 md:mt-8'/>
            </>}
        </div>
    )
}
