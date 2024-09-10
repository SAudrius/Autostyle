import React, { useEffect, useRef, useState } from 'react'

import { ArrowDown } from '@/components';
import { cn, useDetectClickOutside } from '@/config';

interface SearchSelectInputProps {
    options: filterOption[],
    setSelectedOption: ( index: number, name: string ) => void,
    selectedName: string,
    hidden: boolean,
    hiddenMessage: string,
}

export const SearchSelectInput = ( { options, setSelectedOption, selectedName, hidden, hiddenMessage }: SearchSelectInputProps ) => {
    const dropDownRef = useRef<HTMLUListElement>( null );
    const inputRef = useRef<HTMLInputElement>( null );
    const [ isOpen, setIsOpen ] = useState( false );

    const [ inputValue, setInputValue ] = useState( selectedName );

    const toggleDropdown = () => setIsOpen( ( prev ) => !prev );

    useEffect( () => {
        setInputValue( selectedName );
    }, [ selectedName ] );
    
    useEffect( () => {
        if ( isOpen && inputRef.current ) {
            inputRef.current.focus();
        }
    }, [ isOpen ] );

    useDetectClickOutside( dropDownRef, () => setIsOpen( false ) );

    return (
        <ul ref={dropDownRef} onClick={toggleDropdown} className='relative bg-white '>
            {!isOpen && <p className='w-full py-[10px] px-4 leading-4 text-[12px] tracking-wide-10 cursor-pointer'>{selectedName}</p>}
            {isOpen && 
            <input ref={inputRef}
                className='w-full py-[10px] px-4 leading-4 text-[12px] tracking-wide-10 cursor-pointer outline-none'
                onChange={( ( e ) => setInputValue( e.target.value ) )}
                value={inputValue} 
            />
            }
            <ArrowDown activator={isOpen} className='absolute right-[12px] top-[8px]'/>
            <div className={cn( 'absolute top-[37px] h-[300px] w-[290px] z-10', { "h-0 visible": !isOpen }, { "h-[320px] overflow-y-auto": isOpen } )}>
                <div className={cn( ' w-full transition-height-visibility-css overflow-hidden', { "h-0 visible": !isOpen }, { "h-[220px] overflow-y-auto": isOpen } )}>
                    <div className='bg-white shadow-xl max-w-[288px]'>
                        { options && options.slice().map( ( option ) => <li onClick={() => setSelectedOption( option.id, option.name )} className='w-full p-3 px-4 leading-4 text-[12px] tracking-wide-10 border-2 border-white hover:border-primary-dark cursor-pointer' key={`option-visible${option.id}`}>{option.name}</li> )}
                    </div>
                </div>
            </div>
            {hidden && <div className={cn( 'absolute top-[37px] h-[300px] w-[290px] z-10', { "h-0 visible": !isOpen }, { "h-[320px] overflow-y-auto": isOpen } )}>
                <div className={cn( ' w-full transition-height-visibility-css overflow-hidden ', { "h-0 visible": !isOpen }, { "h-[220px] overflow-y-auto": isOpen } )}>
                    <div className='bg-white shadow-xl max-w-[288px]'>
                        <li onClick={() => setSelectedOption( -1, hiddenMessage )} className='w-full p-3 px-4 leading-4 text-[12px] tracking-wide-10 border-2 border-white hover:border-primary-dark cursor-pointer'>{hiddenMessage}</li>
                    </div>
                </div>
            </div>}
        </ul>
    )
}
