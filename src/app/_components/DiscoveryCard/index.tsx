import React from 'react'

import { Button } from '@/components'
import { cn } from '@/config'

interface DiscoveryCardProps {
    className?: string,
    description: string,
    brand: string,
    imgClass: string
}

export const DiscoveryCard = ( { brand, description, className, imgClass }: DiscoveryCardProps ) => {
    return (
        <div className={cn( 'flex w-full justify-center', className )}>
            <div className={cn( 'flex flex-col justify-end h-[500px] bg-gray-400 p-12 max-w-[400px] w-full bg-cover bg-center rounded', imgClass )}>
                <p className='text-[13px] uppercase text-neutral-000'>{description}</p>
                <p className='mt-4 text-2xl tracking-wide-6 sm:tracking-wide-24 uppercase text-neutral-000'>{brand}</p>
                <div>
                    <Button variant='outlineSecondary' className='mt-12 w-full md:w-auto px-8 text-[13px] lg:text-[15px] lg:py-[14px] tracking-tighter sm:tracking-wide-6'>SHOP {brand}</Button>
                </div>
            </div>
        </div>
    )
}
