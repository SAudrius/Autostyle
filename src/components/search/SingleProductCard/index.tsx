import React from 'react'

import { cn, nunito, openSans } from '@/config'

interface SingleProductCardProps {
    productImgUrl: string,
    name: string,
    price: number,
    brand: string,
    model: string,
    year: number,
    discountPrice?: string,
    className?: string
}

export const SingleProductCard = ( { productImgUrl, name, price, brand, model, year, discountPrice, className }: SingleProductCardProps ) => {
    return (
        <div className={cn( '', className )}>
            <div className='h-60 w-full bg-neutral-300 rounded'>
                {/* <img src="" alt="" /> */}
            </div>
            <div className='flex mt-3 flex-wrap col gap-y-2 gap-x-3'>
                <span className='bg-neutral-800 px-4 py-2 text-white tracking-wide-12 text-[12px] rounded'>{brand}</span>
                <span className='bg-neutral-800 px-4 py-2 text-white tracking-wide-12 text-[12px] rounded'>{year}</span>
                <span className='bg-neutral-800 px-4 py-2 text-white tracking-wide-12 text-[12px] rounded'>{model}</span>
            </div>
            <p className={cn( 'mt-3 font-semibold text-base leading-5', nunito.className )}>{name}</p>
            {!discountPrice &&<p className={cn( 'mt-2 text-lg leading-5 font-semibold', openSans.className )}>€{price}</p>}
            {discountPrice && 
            <div className='flex gap-3'>
                <p className={cn( 'discount-price mt-2 text-lg leading-5 font-semibold', openSans.className )}>€{discountPrice}</p>
                <div className="mt-2 relative before:content-[''] before:absolute before:left-0 before:right-0 before:top-[10px] before:h-[1px] before:bg-neutral-500">
                    <p className={cn( 'text-base leading-5 text-neutral-500', openSans.className )}>€{price}</p>
                </div>
            </div>
            }   
        </div>
    )
}
