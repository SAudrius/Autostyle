import React from 'react'

import { cn } from '@/config'

interface ProductLoadingSkeletonProps {
    className?:string
}

export const ProductLoadingSkeleton = ( { className }:ProductLoadingSkeletonProps ) => {
    return (
        (
            <div className={cn( className )}>
                <div className='h-60 w-full bg-neutral-300 rounded animate-loading bg-gradient-to-l from-neutral-300 via-neutral-200 via-20% to--neutral-800 bg-[length:200%_100%]'>
                    {/* <img src="" alt="" /> */}
                </div>
                <div className='flex mt-3 flex-wrap col gap-y-2 gap-x-3'>
                    <span className='bg-neutral-800 px-4 py-2 text-white tracking-wide-12 text-[12px] rounded w-24 h-[34px] animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-20% to--neutral-800 bg-[length:200%_100%]'></span>
                    <span className='bg-neutral-800 px-4 py-2 text-white tracking-wide-12 text-[12px] rounded w-16 h-[34px] animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-20% to--neutral-800 bg-[length:200%_100%]'></span>
                    <span className='bg-neutral-800 px-4 py-2 text-white tracking-wide-12 text-[12px] rounded w-48 h-[34px] animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-20% to--neutral-800 bg-[length:200%_100%]'></span>
                </div>
                <p className='mt-3 font-semibold bg-neutral-800 w-full h-4 rounded from-8% to-33% animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-15% to--neutral-800 bg-[length:200%_100%]'></p>
                <p className='mt-2 font-semibold bg-neutral-800 w-20 h-5 rounded animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-15% to--neutral-800 bg-[length:200%_100%]'></p>
            </div>
        )
    )
}
