import React, { KeyboardEvent, useEffect, useRef } from 'react'

interface CodeVerificationProps {
    otpArr: string[]
    setOtpArr: React.Dispatch<React.SetStateAction<string[]>>
    handleCancel: () => void
    handleNewCode: () => void,
}

export const CodeVerification = ( { setOtpArr, otpArr, handleCancel, handleNewCode }: CodeVerificationProps ) => {
    const refs = useRef<( HTMLInputElement | null )[]>( [] );

    const handleKeyDown = ( e: KeyboardEvent<HTMLInputElement>, index: number ) => {
        if ( e.key === "Backspace" ) {

            const newOtp = [ ...otpArr ];
            if ( otpArr[index] === "" ) {

                if ( index > 0 ) {
                    refs.current[index - 1]?.focus();
                    newOtp[index - 1] = "";
                    setOtpArr( newOtp );
                }
            }
            else if ( refs.current[index] ) {
                refs.current[index].value = '';
                refs.current[index - 1]?.focus();
                newOtp[index ] = "";
                setOtpArr( newOtp );
            } 
        }
        else if ( /^[0-9]$/.test( e.key ) ) {
            const newOtp = [ ...otpArr ];
            newOtp[index] = e.key;
            setOtpArr( newOtp );
            if ( refs.current[index] ) {
                refs.current[index].value = e.key;
            }
            if ( index < 5 ) {
                refs.current[index + 1]?.focus();
            }
        }
    };

    // Handle click event on the input
    const handleClick = ( index: number ) => {
        const input = refs.current[index];
        if ( input ) {
            input.focus();
            input.setSelectionRange( 0, 1 ); // Ensure the selection starts at the beginning
        }
    };
    
    const handlePaste = ( e: React.ClipboardEvent<HTMLDivElement> ) => {
        e.preventDefault();
        const paste = e.clipboardData.getData( 'text' );
        console.log( paste, '@Past' )
        if ( /^\d+$/.test( paste ) ) {
            const pasteValues = paste.split( '' )
            const newValues = [ ...otpArr ]

            pasteValues.forEach( ( val, i ) => {
                newValues[i] = val;
            } );
            
            setOtpArr( newValues )

            console.log( 'hi', newValues )
            if ( newValues.length === 0 ) {
                return
            }
            newValues.forEach( ( val, i ) => {
                if ( refs.current[i] ) {
                    refs.current[i].value = val;
                }
            } );

            if ( pasteValues.length < 6 ) {
                refs.current?.[pasteValues.length ]?.focus();
            }
        }
    };

    useEffect( () => {
        if ( refs.current.length !== otpArr.length ) {
            refs.current = Array( otpArr.length ).fill( null );
        }
    }, [ otpArr.length ] );
    
    return ( <>
        <div className="mt-4 flex justify-between m-auto" onPaste={handlePaste}>
            {otpArr.map( ( value, index ) => (
                <input
                    key={index}
                    ref={( el ) => {
                        refs.current[index] = el;
                    }}
                    readOnly={true}
                    type="text"
                    maxLength={1}
                    value={value}
                    className="h-12 w-10 rounded border border-gray-300 text-center text-2xl outline-none custom-selection"
                    onKeyDown={( e ) => handleKeyDown( e, index )}
                    onClick={() => handleClick( index )}
                />
            ) )}
        </div>
        <div className="flex justify-between">
            <p className="mt-2 cursor-pointer text-sm underline" onClick={handleNewCode}>
                Send new code
            </p>
            <button type="button" className="mt-2 cursor-pointer text-sm underline" onClick={handleCancel}>Cancel</button>
        </div>
    </>
    )
}
