import React from 'react'

import { cn } from '@/config'

import { SearchFilters } from '../SearchFilters'
import { SearchProducts } from '../SearchProducts'

interface SearchBodyProps {
    className?: string
}

export const SearchBody = ( { className }: SearchBodyProps ) => {
    return (
        <section className={cn( "container-search pb-8 md:grid md:grid-cols-[320px_1fr] min-h-[80vh] gap-8 relative", className )}>
            <SearchFilters className="hidden md:block"/>
            <SearchProducts className=''/>
        </section>
    )
}
