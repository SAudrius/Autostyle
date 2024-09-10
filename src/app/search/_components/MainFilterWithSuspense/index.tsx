
import React from 'react'

import { getBrandsName } from '@/lib'

import { MainFilter } from '../MainFilter'

export const MainFilterWithSuspnse = async () => {
    const BrandOptions = await getBrandsName()
    if ( !BrandOptions ) {
        return <h2 className='text-center py-3 px-4 bg-neutral-800 text-red-100'>Something went wrong</h2>
    }

    return (
        <MainFilter brands={BrandOptions} className='mt-8'/>
    )
}
