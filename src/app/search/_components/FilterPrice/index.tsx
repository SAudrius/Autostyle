'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Line } from '@/components';
import { cn, useDebounce } from '@/config';
import { setPriceMaxValue, setPriceMinValue, useAppDispatch  } from '@/lib';

interface filterPriceProps {
    version: 'mobile' | 'desktop'
}

export const FilterPrice = ( { version }:filterPriceProps ) => {
    const [ visibleFilter, setVisibleFilter ] = useState( false )
    const dispatch = useAppDispatch();

    const min = 0
    const max = 1000
    const [ minVal, setMinVal ] = useState( min );
    const [ maxVal, setMaxVal ] = useState( max );
    const minValRef = useRef( min );
    const maxValRef = useRef( max );
    const range = useRef<HTMLDivElement>( null );

    const debouncedMinVal = useDebounce( minVal, 500 );
    const debouncedMaxVal = useDebounce( maxVal, 500 );
  
    const getPercent = useCallback(
        ( value: number ) => Math.round( ( ( value - min ) / ( max - min ) ) * 100 ),
        [ min, max ]
    );

    useEffect( () => {
        dispatch( setPriceMinValue( Number( debouncedMinVal ) ) );
        dispatch( setPriceMaxValue( Number( debouncedMaxVal ) ) );
    }, [ debouncedMinVal, debouncedMaxVal, dispatch ] );
  
    useEffect( () => {
        const minPercent = getPercent( minVal );
        const maxPercent = getPercent( maxValRef.current );
  
        if ( range.current ) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [ minVal, getPercent ] );
  
    useEffect( () => {
        const minPercent = getPercent( minValRef.current );
        const maxPercent = getPercent( maxVal );
  
        if ( range.current ) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [ maxVal, getPercent ] );

    const handleMinInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value.replace( /[^0-9]/g, '' ); 
        const numericValue = Math.min( Number( value ), maxVal - 1 );
        setMinVal( numericValue );
        minValRef.current = numericValue;
    };

    const handleMaxInputChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value.replace( /[^0-9]/g, '' );
        let numericValue = Math.max( Number( value ), minVal + 1 );
        if ( numericValue > max ) {
            numericValue = max;
        }
        setMaxVal( numericValue );
        maxValRef.current = numericValue;
    };

    const toglePriceFilterVisible = () => {
        console.log( 'click' )
        console.log( visibleFilter, 'vs' )
        setVisibleFilter( ( state ) => !state )
    }

    return (
        <div className='h-[120px]'>
            <div className='relative mt-6'>
                <div className='absolute right-[1px] top-[7px]'>
                    <div className='bg-black h-[1px] w-[13px]'></div>
                    <div className={cn( ' absolute top-[-6px] right-[6px] bg-black h-[13px] w-[1px] duration-200 ', { 'rotate-90' :visibleFilter }, { 'rotate-0' :!visibleFilter } )}></div>
                </div>
                <button type='button' onClick={toglePriceFilterVisible} className={cn( 'text-[12px] uppercase tracking-wide-20 block w-full text-left' )}>Price (€)</button>
                <Line className='mt-4'/>
            </div>
            <div className={cn( "mt-5 relative transition-height-visibility-css overflow-hidden", { 'visible h-[95px]': visibleFilter }, { 'h-0': !visibleFilter } )}>
                <div className={cn( 'absolute w-12 bg-neutral-500 h-[1px] left-[42%] top-3', { 'hidden': version === 'mobile' } )}></div>
                <div className='flex justify-between'>
                    <input className="w-28 px-3 text-center outline-none border border-gray-200 rounded" onChange={handleMinInputChange} type='text' value={minVal}/>
                    <input className="w-28 px-3 text-center outline-none border border-gray-200 rounded" onChange={handleMaxInputChange} type='text' value={maxVal}/>
                </div>
                <div className={cn( 'w-[298px] relative mt-4 mx-auto', { 'w-[548px]': version === 'mobile' }, { 'w-[298px]': version === 'desktop' } )}>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={minVal}
                        onChange={( event ) => {
                            const value = Math.min( Number( event.target.value ), maxVal - 1 );
                            setMinVal( value );
                            minValRef.current = value;
                        }}
                        className={cn( 'thumb absolute h-[0px] w-full outline-none z-[3] pointer-events-none left-[-2px]', { 'z-[5]': minVal > max - 100 } )}
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none',  }}

                    />
                    <input
                        type="range"
                        min={min}
                        max={max}
                        value={maxVal}
                        onChange={( event ) => {
                            const value = Math.max( Number( event.target.value ), minVal + 1 );
                            setMaxVal( value );
                            maxValRef.current = value;
                        }}
                        className="thumb absolute h-[0px] w-full outline-none z-[4] pointer-events-none right-[-2px]"
                        style={{ WebkitAppearance: 'none', MozAppearance: 'none',  }}
                    />
                    <div className="slider relative">
                        <div className='absolute h-[18px] top-[-7px] w-[4px] rounded border-gray-300 border z-[2] bg-neutral-000'></div>
                        <div className='absolute left-[25%] h-[18px] top-[-7px] w-[1px] bg-[#7A7A7A]'></div>
                        <div className='absolute left-[50%] h-[18px] top-[-7px] w-[1px] bg-[#7A7A7A]'></div>
                        <div className='absolute left-[75%] h-[18px] top-[-7px] w-[1px] bg-[#7A7A7A]'></div>
                        <div className='absolute right-0 h-[18px] top-[-7px] w-[4px] rounded border-gray-300 bg-neutral-000 border z-[2]'></div>
                        <div className="slider__track w-full z-[1] absolute h-[4px] rounded border border-gray-300" />
                        <div ref={range} className="slider__range bg-black z-[2] absolute h-[4px] rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
