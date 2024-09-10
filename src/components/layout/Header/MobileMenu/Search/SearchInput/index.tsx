import React, { useEffect, useState } from "react";

import { cn, nunito  } from "@/config";
import { useDebounce } from "@/config/hooks/useDebounce";
import { setSearchString, useAppDispatch, useAppSelector  } from "@/lib";

interface SearchInputProps {
  className?: string;
  onClick?: () => void
}

export const SearchInput = ( { className, onClick }: SearchInputProps ) => {
    const dispatch = useAppDispatch()
    const searchString = useAppSelector( ( state ) => state.filters.searchString )

    const [ inputValue, setInputValue ] = useState( searchString ); 
    const debouncedInputValue = useDebounce( inputValue, 300 );

    useEffect( () => {
        dispatch( setSearchString( debouncedInputValue.toString() ) );
    }, [ debouncedInputValue, dispatch ] );


    const handelSearchInput = ( e: React.ChangeEvent<HTMLInputElement> ) => {
        const input = e.target.value;
        setInputValue( input );
    }
    
    return (
        <>
            <input
                onChange={handelSearchInput}
                onClick={onClick}
                placeholder="Search your style"
                className={cn(
                    "w-full max-w-[480px] px-2 py-2 text-lg outline-none bg-shade",
                    nunito.className,
                    className,
                )}
            />
        </>
    );
};
