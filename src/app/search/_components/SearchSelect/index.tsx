import React, { useRef, useState } from 'react'

import { ArrowDown } from '@/components';
import { cn, useDetectClickOutside } from '@/config';

interface SearchSelectProps {
    options: filterOption[]
    setSelectedOption: ( index: number, name:string ) => void
    selectedName: string
    hidden?: boolean,
    hiddenMessage?: string,
}

export const SearchSelect = ( { options, setSelectedOption, selectedName, hidden, hiddenMessage }: SearchSelectProps ) => {
    const dropDownRef = useRef<HTMLUListElement>( null );
    const [ isOpen, setIsOpen ] = useState( false );

    const toggleDropdown = () => { 

        setIsOpen( ( prev ) => !prev )
    };

    useDetectClickOutside( dropDownRef, () => setIsOpen( false ) );

    return (
        <ul ref={dropDownRef} onClick={toggleDropdown} className='relative bg-neutral-000 '>
            <p className='w-full py-[10px] px-4 leading-4 text-[12px] tracking-wide-10 cursor-pointer'>{selectedName}</p>
            <ArrowDown activator={isOpen} className='absolute right-[12px] top-[8px]'/>
            {!hidden && <div className={cn( 'absolute top-[37px] h-[300px] w-full z-10', { "h-0 visible": !isOpen }, { "h-[320px] overflow-y-auto": isOpen } )}>
                <div className={cn( ' w-full transition-height-visibility-css overflow-hidden', { "h-0 visible": !isOpen }, { "h-[220px] overflow-y-auto": isOpen } )}>
                    <div className='bg-white shadow-xl w-full'>
                        {options.length && options.map( ( option ) => <li onClick={() => setSelectedOption( option.id, option.name )} className='w-full p-3 px-4 leading-4 text-[12px] tracking-wide-10 border-2 border-white hover:border-primary-dark cursor-pointer' key={`original-${option.id}`}>{option.name}</li> )}
                    </div>
                </div>
            </div>}
            {hidden && <div className={cn( 'absolute top-[37px] h-[300px] w-full z-10', { "h-0 visible": !isOpen }, { "h-[320px] overflow-y-auto": isOpen } )}>
                <div className={cn( ' w-full transition-height-visibility-css overflow-hidden ', { "h-0 visible": !isOpen }, { "h-[220px] overflow-y-auto": isOpen } )}>
                    <div className='bg-white shadow-xl w-full'>
                        <li className='w-full p-3 px-4 leading-4 text-[12px] tracking-wide-10 border-2 border-white hover:border-primary-dark cursor-pointer'>{hiddenMessage}</li>
                    </div>
                </div>
            </div>}
        </ul>
    )
}
