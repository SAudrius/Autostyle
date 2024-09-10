import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { Button } from '@/components'
import { cn } from '@/config'

interface DiscoveryCardProps {
    className?: string,
    description: string,
    brand: string,
    imgClass: string,
    imgPath: StaticImageData
}

export const DiscoveryCard = ( { brand, description, className, imgClass, imgPath }: DiscoveryCardProps ) => {
    return (
        <div className={cn( 'flex w-full justify-center rounded', className )}>
            <div className={cn( 'relative flex flex-col justify-end h-[500px] bg-neutral-800 p-12 w-full bg-cover bg-center rounded', imgClass )}>
                <p className='relative z-10 text-[13px] uppercase text-neutral-000'>{description}</p>
                <p className='relative z-10 mt-4 text-2xl tracking-wide-6 sm:tracking-wide-24 uppercase text-neutral-000'>{brand}</p>
                <div className='relative z-10'>
                    <Button variant='outlineSecondary' className='mt-12 w-full md:w-auto px-8 text-[13px] lg:text-[15px] lg:py-[14px] tracking-tighter sm:tracking-wide-6'>SHOP {brand}</Button>
                </div>
                <Image
                    src={imgPath}
                    fill
                    quality={100}
                    alt="Autoplate logo"
                    style={{ objectFit:'cover', zIndex: 9, borderRadius: '4px' }}
                />
            </div>
        </div>
    )
}
