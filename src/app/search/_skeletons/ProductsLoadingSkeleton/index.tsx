import React from 'react'

import { cn } from '@/config'

import { ProductLoadingSkeleton } from '../ProductLoadingSkeleton'

interface ProductsLoadingSkeleton {
    className?: string;
}

export const ProductsLoadingSkeleton = ( { className }: ProductsLoadingSkeleton ) => {
    return (
        <div className={cn( className, 'grid gap-6 md:gap-8 lg:grid-cols-2' )}>
            <ProductLoadingSkeleton/>
            <ProductLoadingSkeleton/>
            <ProductLoadingSkeleton/>
            <ProductLoadingSkeleton/>
            <ProductLoadingSkeleton/>
            <ProductLoadingSkeleton/>
        </div>
    )
}
