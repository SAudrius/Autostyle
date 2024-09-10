'use client'
import audiCardPath from 'public/assets/home/discovery-section/audi-card.png';
import bmwCardPath from 'public/assets/home/discovery-section/bmw-card.png';
import hondaCardPath from 'public/assets/home/discovery-section/honda-card.png';
import mercedesCardPath from 'public/assets/home/discovery-section/mercedes-card.png';
import nissanCardPath from 'public/assets/home/discovery-section/nissan-card.png';
import toyotaCardPath from 'public/assets/home/discovery-section/toyota-card.png';
import volkswagenCardPath from 'public/assets/home/discovery-section/volkswagen-card.png';
import volvoCardPath from 'public/assets/home/discovery-section/volvo-card.png';
import React, { useState } from 'react'

import { BackgroundIcon, Button  } from '@/components'
import { cn, montserrat } from '@/config'

import { DiscoveryCard } from '../DiscoveryCard'

interface DiscoverySectionProps {
    className?: string,
}

export const DiscoverySection = ( { className }: DiscoverySectionProps ) => {
    const [ displayMore, setDisplayMore ] = useState( false )

    return (
        <section className={cn( 'bg-discovery-gradient relative overflow-hidden pt-20 pb-12 md:pt-[120px] md:pb-[120px] lg:pb-[180px]', className )}>
            <h2 className={cn( 'relative container-v2 text-neutral-800 font-medium uppercase text-[20px] lg:text-[24px] tracking-wide-20 text-center z-10', montserrat.className )} >Discover Leading<br className='sm:hidden'/> Auto Brands</h2>
            <div className='relative z-10 container-v2 mt-12 grid m-auto gap-4 sm:gap-6 md:gap-8 md:mt-20 md:grid-cols-2 lg:grid-cols-12'>
                <DiscoveryCard className='lg:col-span-4' imgPath={mercedesCardPath} brand='Mercedes' description='Elegant Performance' imgClass="bg-[url('https://Autostyle.b-cdn.net/mercedes-card.png')]"/>
                <DiscoveryCard className='lg:col-span-4' imgPath={audiCardPath} brand='AUDI' description='Art of Progress' imgClass="bg-[url('https://Autostyle.b-cdn.net/audi-card.png')]" />
                <DiscoveryCard className='lg:col-span-4' imgPath={volkswagenCardPath} brand='Volkswagen' description='Precision Engineering' imgClass="bg-[url('https://Autostyle.b-cdn.net/volkswagen-card.png')]"/>
                <DiscoveryCard className='lg:col-span-4' imgPath={bmwCardPath} brand='BMW' description='Driving Pleasure' imgClass="bg-[url('https://Autostyle.b-cdn.net/bmw-card.png')]"/>
                <DiscoveryCard className={cn( 'hidden md:flex lg:col-span-4' )} imgPath={volvoCardPath}  brand='Volvo' description='Unmatched Safety' imgClass="bg-[url('https://Autostyle.b-cdn.net/volvo-card.png')]" />
                <DiscoveryCard className={cn( 'hidden md:flex lg:col-span-4' )} imgPath={toyotaCardPath} brand='Toyota' description='Trusted Performance' imgClass="bg-[url('https://Autostyle.b-cdn.net/toyota-card.png')]"/>
                <DiscoveryCard className={cn( 'hidden md:flex lg:col-span-4 lg:col-start-3' )} imgPath={nissanCardPath} brand='Nissan' description='Dynamic Innovation' imgClass="bg-[url('https://Autostyle.b-cdn.net/nissan-card.png')]" />
                <DiscoveryCard className={cn( 'hidden md:flex lg:col-span-4 lg:col-start-7' )} imgPath={hondaCardPath} brand='Honda' description='Engineering Excellence' imgClass="bg-[url('https://Autostyle.b-cdn.net/honda-card.png')]" />
                <div className={cn( 'relative transition-height-visibility-css overflow-hidden h-0 md:hidden', 
                    { "h-[2073px] overflow-hidden" : displayMore },
                    { "h-0 visible" : !displayMore },  
                )}>
                    <div className='h-auto grid gap-4 sm:gap-6 m-auto '>
                        <DiscoveryCard className="flex" imgPath={volvoCardPath} brand='Volvo' description='Unmatched Safety' imgClass="bg-[url('https://Autostyle.b-cdn.net/volvo-card.png')]" />
                        <DiscoveryCard className="flex" imgPath={toyotaCardPath} brand='Toyota' description='Trusted Performance' imgClass="bg-[url('https://Autostyle.b-cdn.net/toyota-card.png')]"/>
                        <DiscoveryCard className="flex" imgPath={nissanCardPath} brand='Nissan' description='Dynamic Innovation' imgClass="bg-[url('https://Autostyle.b-cdn.net/nissan-card.png')]" />
                        <DiscoveryCard className="flex" imgPath={hondaCardPath} brand='Honda' description='Engineering Excellence' imgClass="bg-[url('https://Autostyle.b-cdn.net/honda-card.png')]" />
                    </div>
                </div>
            </div>
            <Button className='m-auto md:hidden block mt-6 relative z-10' variant='underline' onClick={() => setDisplayMore( prevState => !prevState )}>{displayMore ? "Show Less" : "Show More" }</Button>
            <BackgroundIcon className='absolute top-[-660px] rotate-[150deg] left-[-495px]'/>
            <BackgroundIcon className='absolute bottom-[-110px] rotate-[-22deg] right-[-430px]'/>
        </section>
    )
}
