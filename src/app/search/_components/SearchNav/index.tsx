'use client'
import React, { useEffect, useRef, useState } from 'react'

import { ArrowDown, Line, VerticalLine  } from '@/components'
import { cn, nunito, useDebounce, useDetectClickOutside  } from '@/config'
import { searchAnimateOn, searchFilterOn, searchMobileFilterOn, searchSortOn, setSearchGridBig, setSearchGridSmall, setSearchString, turnModalOn, useAppDispatch, useAppSelector  } from '@/lib'

import { Cube } from '../Cube'
import { SearchSortDesktopMenu } from '../SerachSortDesktopMenu'

export const SearchNav = () => {
    const dispatch = useAppDispatch()

    const searchString = useAppSelector( ( state )=> state.filters.searchString )

    const [ inputValue, setInputValue ] = useState( searchString ); 
    const debouncedInputValue = useDebounce( inputValue, 300 );

    const sortDesktopRef = useRef( null )
    const [ searchDesktopSort, setSearchDesktopSort ] = useState( false )

    const searchGrid = useAppSelector( ( state ) => state.search.searchGrid )
    const searchSortActive = useAppSelector( ( state ) => state.search.searchSort )

    useEffect( () => {
        dispatch( setSearchString( debouncedInputValue.toString() ) );
    }, [ debouncedInputValue, dispatch ] );


    useEffect( () => {
        setInputValue( searchString )
    }, [ searchString ] )

    const handelSearchInput = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const input = e.target.value;
        setInputValue( input );
    }

    const handleTogleSortDesktop = () => {
        setSearchDesktopSort( ( prev ) => !prev )
    }

    const handleCloseSortDesktop = () => {
        setSearchDesktopSort( false )
    }

    const handleSmallGridClick = () => {
        dispatch( setSearchGridSmall() )
    }

    const handleBigGridClick = () => {
        dispatch( setSearchGridBig() )
    }

    const handleSortOn = () => {
        turnModalOn( dispatch, [ searchSortOn, searchAnimateOn ], 300 )
    }

    const handleFilterOn = () => {
        dispatch( searchMobileFilterOn() )
        setTimeout( () => { 
            turnModalOn( dispatch, [ searchFilterOn, searchAnimateOn ], 100 )
        }, 50 )
    }

    useDetectClickOutside( sortDesktopRef, handleCloseSortDesktop )

    return (
        <div className=''>
            <div className='max-w-full mx-auto pl-4 flex bg- h-12 justify-between items-center md:hidden sm:pl-6'>
                <input className={cn( 'bg-transparent focus:outline-none tracking-wide-6 sm:w-[300px]', nunito.className )} type="text" placeholder='Search product' onChange={handelSearchInput} />
                <div className='flex md:hidden pr-4 h-12 items-center group  bg-primary-dark hover:bg-black sm:pr-6'>
                    <VerticalLine className='mr-4 sm:mr-6 bg-primary-dark group-hover:bg-black'/>
                    <svg
                        className=''
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.26762 18.5283C7.43505 18.529 5.64344 17.9861 4.11943 16.9684C2.59542 15.9508 1.40747 14.5039 0.70586 12.811C0.00424862 11.118 -0.179506 9.25505 0.177842 7.45765C0.535191 5.66026 1.41759 4.00923 2.71341 2.71341C4.00923 1.41759 5.66026 0.535191 7.45765 0.177842C9.25505 -0.179506 11.118 0.00424862 12.811 0.70586C14.5039 1.40747 15.9508 2.59542 16.9684 4.11943C17.9861 5.64344 18.529 7.43505 18.5283 9.26762C18.5246 11.7226 17.5478 14.0759 15.8118 15.8118C14.0759 17.5478 11.7226 18.5246 9.26762 18.5283ZM9.26762 1.74225C7.7791 1.74156 6.3238 2.18233 5.0858 3.00881C3.8478 3.83529 2.88271 5.01035 2.3126 6.38538C1.74249 7.7604 1.59297 9.27361 1.88294 10.7336C2.17292 12.1936 2.88937 13.5348 3.94167 14.5876C4.99397 15.6404 6.33486 16.3575 7.79474 16.6481C9.25461 16.9388 10.7679 16.79 12.1432 16.2205C13.5185 15.651 14.694 14.6865 15.521 13.4489C16.3481 12.2112 16.7895 10.7561 16.7895 9.26762C16.7868 7.27322 15.9935 5.36124 14.5836 3.95065C13.1736 2.54007 11.262 1.74593 9.26762 1.74225Z"
                            fill="black"
                            className="fill-white"
                        />
                        <path
                            d="M23.1218 23.985C23.0075 23.9854 22.8943 23.9632 22.7886 23.9196C22.683 23.8761 22.587 23.812 22.5063 23.7312L14.0385 15.2564C13.8752 15.0932 14.6408 15.3734 14.6408 15.1425C14.4776 15.3057 14.6408 14.9116 14.6408 15.1425C14.8041 14.9792 15.0386 14.6295 15.2695 14.6295C15.5004 14.6295 15.2695 14.0254 15.2695 14.0254L23.7443 22.5001C23.8666 22.6221 23.9498 22.7778 23.9832 22.9473C24.0167 23.1168 23.9989 23.2925 23.9321 23.4518C23.8653 23.6111 23.7526 23.747 23.6082 23.8419C23.4639 23.9369 23.2945 23.9867 23.1218 23.985Z"
                            fill="black"
                            className="fill-white"
                        />
                    </svg>
                </div>
            </div>
            <Line className='md:hidden'/>
            <div className='container-search flex h-12 items-center lg:pr-0 xl:px-[7.5rem]'>
                <div onClick={handleSortOn} className='flex h-full items-center cursor-pointer md:hidden'>
                    <p className='text-sm uppercase tracking-wide-6'>Sort</p>
                    <ArrowDown activator={searchSortActive} className="mr-4 sm:mr-6 md:mr-8"/>
                    <VerticalLine className='md:hidden'/>
                </div>
                <div className='hidden md:flex gap-6'>
                    <Cube className='lg:hidden cursor-pointer' variant='single' onClick={handleSmallGridClick} active={searchGrid === 'small' ? true : false}/>
                    <Cube className='lg:hidden mr-6 lg:mr-0' variant='duoble' onClick={handleBigGridClick}  active={searchGrid === 'big' ? true : false}/>
                    <Cube className='hidden lg:grid mr-6 lg:mr-0' variant='duoble' onClick={handleSmallGridClick} active={searchGrid === 'small' ? true : false}/>
                    <Cube className='hidden lg:grid mr-6' variant='triple' onClick={handleBigGridClick} active={searchGrid === 'big' ? true : false}/>
                    <VerticalLine className='md:hidden'/>
                </div>
                <div className='hidden md:flex h-full items-center w-full'>
                    <VerticalLine className=''/>
                    <input onChange={handelSearchInput} className={cn( 'md:ml-8 hidden md:block bg-transparent focus:outline-none w-full tracking-wide-6 sm:w-[300px]', nunito.className )} type="text" placeholder='Search product' value={inputValue} />
                </div>
                <div className='hidden md:flex h-full items-center hover:bg-primary-dark bg-neutral-800 group w-16 justify-center'>
                    <VerticalLine className='md:mr-[10px] md:hidden group-hover:bg-primary-dark bg-neutral-800'/>
                    <svg
                        className='mr-0'
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.26762 18.5283C7.43505 18.529 5.64344 17.9861 4.11943 16.9684C2.59542 15.9508 1.40747 14.5039 0.70586 12.811C0.00424862 11.118 -0.179506 9.25505 0.177842 7.45765C0.535191 5.66026 1.41759 4.00923 2.71341 2.71341C4.00923 1.41759 5.66026 0.535191 7.45765 0.177842C9.25505 -0.179506 11.118 0.00424862 12.811 0.70586C14.5039 1.40747 15.9508 2.59542 16.9684 4.11943C17.9861 5.64344 18.529 7.43505 18.5283 9.26762C18.5246 11.7226 17.5478 14.0759 15.8118 15.8118C14.0759 17.5478 11.7226 18.5246 9.26762 18.5283ZM9.26762 1.74225C7.7791 1.74156 6.3238 2.18233 5.0858 3.00881C3.8478 3.83529 2.88271 5.01035 2.3126 6.38538C1.74249 7.7604 1.59297 9.27361 1.88294 10.7336C2.17292 12.1936 2.88937 13.5348 3.94167 14.5876C4.99397 15.6404 6.33486 16.3575 7.79474 16.6481C9.25461 16.9388 10.7679 16.79 12.1432 16.2205C13.5185 15.651 14.694 14.6865 15.521 13.4489C16.3481 12.2112 16.7895 10.7561 16.7895 9.26762C16.7868 7.27322 15.9935 5.36124 14.5836 3.95065C13.1736 2.54007 11.262 1.74593 9.26762 1.74225Z"
                            fill="black"
                            className="md:fill-white"
                        />
                        <path
                            d="M23.1218 23.985C23.0075 23.9854 22.8943 23.9632 22.7886 23.9196C22.683 23.8761 22.587 23.812 22.5063 23.7312L14.0385 15.2564C13.8752 15.0932 14.6408 15.3734 14.6408 15.1425C14.4776 15.3057 14.6408 14.9116 14.6408 15.1425C14.8041 14.9792 15.0386 14.6295 15.2695 14.6295C15.5004 14.6295 15.2695 14.0254 15.2695 14.0254L23.7443 22.5001C23.8666 22.6221 23.9498 22.7778 23.9832 22.9473C24.0167 23.1168 23.9989 23.2925 23.9321 23.4518C23.8653 23.6111 23.7526 23.747 23.6082 23.8419C23.4639 23.9369 23.2945 23.9867 23.1218 23.985Z"
                            fill="black"
                            className="md:fill-white"
                        />
                    </svg>
                    <VerticalLine className='bg-primary-dark group-hover:bg-black hidden' />
                </div>
                <div ref={sortDesktopRef} onClick={handleTogleSortDesktop} className='relative hidden md:flex h-full items-center ml-6 lg:mr-8 cursor-pointer'>
                    <p className='text-sm uppercase tracking-wide-6'>Sort</p>
                    <ArrowDown activator={searchDesktopSort} className=""/>
                    <VerticalLine className='md:hidden'/>
                    <SearchSortDesktopMenu searchDesktopSort={searchDesktopSort} />
                </div>
                <p onClick={handleFilterOn} className='cursor-pointer md:hidden w-full text-center text-sm uppercase tracking-wide-6 md:w-auto md:ml-16'>FILTERS</p>
            </div>
        </div>
    )
}
