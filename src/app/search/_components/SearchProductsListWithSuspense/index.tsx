import React from 'react'

import { getInitialProductsData } from '@/lib'

import { SearchProductsList } from '../SearchProductsList';

export const SearchProductsListWithSuspense = async () => {
    const productsList = await getInitialProductsData()
    if ( !productsList ) {
        return <h2>Something went wrong</h2>
    }
    return (
        <SearchProductsList products={productsList} />
    )
}
