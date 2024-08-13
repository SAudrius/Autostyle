import React from 'react'

import { BackgroundIcon } from '@/components/ui/custom/BackgroundIcon'
import { cn, montserrat } from '@/config'

import { DiscoveryCard } from '../DiscoveryCard'

interface DiscoverySectionProps {
    className?: string,
}

export const DiscoverySection = ( { className }: DiscoverySectionProps ) => {
    return (
        <section className={cn( 'pt-20 pb-20 md:pt-[120px] md:pb-[180px] bg-discovery-gradient relative overflow-hidden', className )}>
            <h2 className={cn( 'relative container text-neutral-800 font-medium uppercase text-[20px] lg:text-[24px] tracking-wide-20 text-center z-10', montserrat.className )} >Discover Leading<br className='sm:hidden'/> Auto Brands</h2>
            <div className='relative container gap-4 sm:gap-6 md:gap-8 grid m-auto lg:grid-cols-12 mt-12 md:mt-20 md:grid-cols-2 z-10'>
                <DiscoveryCard className='lg:col-span-4 md:justify-start' brand='Mercedes' description='Elegant Performance' imgClass="bg-[url('https://Autostyle.b-cdn.net/mercedes-card.png')]"/>
                <DiscoveryCard className='lg:col-span-4 md:justify-end' brand='BMW' description='Driving Pleasure' imgClass="bg-[url('https://Autostyle.b-cdn.net/bmw-card.png')]"/>
                <DiscoveryCard className='lg:col-span-4 md:justify-end' brand='Volkswagen' description='Precision Engineering' imgClass="bg-[url('https://Autostyle.b-cdn.net/volkswagen-card.png')]"/>
                <DiscoveryCard className='lg:col-span-4 md:justify-start' brand='AUDI' description='Art of Progress' imgClass="bg-[url('https://Autostyle.b-cdn.net/audi-card.png')]" />
                <DiscoveryCard className='lg:col-span-4 md:justify-start' brand='Volvo' description='Unmatched Safety' imgClass="bg-[url('https://Autostyle.b-cdn.net/volvo-card.png')]" />
                <DiscoveryCard className='lg:col-span-4 md:justify-end' brand='Toyota' description='Trusted Performance' imgClass="bg-[url('https://Autostyle.b-cdn.net/toyota-card.png')]"/>
                <DiscoveryCard className='lg:col-span-4 lg:col-start-3 md:justify-end' brand='Nissan' description='Dynamic Innovation' imgClass="bg-[url('https://Autostyle.b-cdn.net/nissan-card.png')]" />
                <DiscoveryCard className='lg:col-span-4 lg:col-start-7 md:justify-start' brand='Honda' description='Engineering Excellence' imgClass="bg-[url('https://Autostyle.b-cdn.net/honda-card.png')]" />
            </div>
            <BackgroundIcon className='absolute top-[-660px] rotate-[150deg] left-[-495px]'/>
            <BackgroundIcon className='absolute bottom-[-110px] rotate-[-22deg] right-[-430px]'/>
        </section>
    )
}
