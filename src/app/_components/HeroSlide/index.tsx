
import Image, { StaticImageData } from 'next/image'
import React from 'react'

import { Button } from '@/components'
import { cn, montserrat } from '@/config'

interface HeroSlideProps {
    featureMessage: string,
    brand: string,
    imgClass:string
    hasButton: boolean
    imgPath: StaticImageData
}

export const  HeroSlide = ( { featureMessage, brand, hasButton, imgClass, imgPath }: HeroSlideProps ) => {
    return (
        <section className='h-[calc(100vh-80px)] lg:h-[calc(100vh-130px)] bg-slate-950'>
            <div className={cn( imgClass, 'relative h-full bg-cover bg-center' )} >
                <div className='container-v2 relative z-10 m-auto py-8 sm:py-20 md:py-24 lg:py-[100px] h-full w-full flex flex-col items-start justify-end text-white'>
                    {featureMessage && <p className={cn( 'text-[13px] tracking-wide-12', montserrat.className )}>{featureMessage}</p>}
                    {brand && <h2 className={cn( 'mt-6 uppercase text-2xl tracking-wide-24', montserrat.className )}>{brand}</h2>}
                    {hasButton && <Button className='mt-12 uppercase py-[14px] px-[36px]' variant='outlineSecondary'>Shop Now</Button>}
                </div>
                <Image
                    src={imgPath}
                    fill
                    sizes='100vw'
                    quality={100}
                    alt="Autoplate logo"
                    style={{ objectFit:'cover', zIndex: 9 }}
                />
            </div>
        </section>
    )
}
