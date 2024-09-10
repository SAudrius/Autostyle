import React from 'react'

import { cn, nunito, openSans } from '@/config'

interface SingleProductCardSmallProps {
    productImgUrl: string,
    name: string,
    price: number,
    brand: string,
    model: string,
    year: number,
    discountPrice?: string,
    className?: string
}

export const SingleProductCardSmall = ( { productImgUrl, name, price, brand, model, year, discountPrice, className }: SingleProductCardSmallProps ) => {
    return (
        <div className={cn( 'grid sm:grid-cols-2 gap-4', className )}>
            <div className='h-28 w-full bg-neutral-300 rounded'>
                {/* <img src="" alt="" /> */}
            </div>
            <div className='flex flex-col mt-1'>
                <p className={cn( 'font-semibold text-base leading-5', nunito.className )}>{name}</p>
                <div className='mt-1 flex gap-2 flex-wrap'>
                    <p className='uppercase tracking-wide-8 text-[12px] rounded'>{brand}</p>
                    <p className='uppercase tracking-wide-8 text-[12px] rounded'>{year}</p>
                    <p className='uppercase tracking-wide-8 text-[12px] rounded'>{model}</p>
                </div>
                {!discountPrice &&<p className={cn( 'mt-5 text-lg leading-5 font-semibold', openSans.className )}>€{price}</p>}
                {discountPrice && 
                <div className='flex gap-3'>
                    <p className={cn( 'discount-price mt-2 text-lg leading-5 font-semibold', openSans.className )}>€{discountPrice}</p>
                    <div className="mt-2 relative before:content-[''] before:absolute before:left-0 before:right-0 before:top-[10px] before:h-[1px] before:bg-neutral-500">
                        <p className={cn( 'text-base leading-5 text-neutral-500', openSans.className )}>€{price}</p>
                    </div>
                </div>
                }   
            </div>
        </div>
    )
}
