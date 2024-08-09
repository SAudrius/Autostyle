"use client";
import React from "react";

import { cn } from "@/config";
import {
    cartAnimateOff,
    cartOff,
    menuAnimateOff,
    menuOff,
    modalAnimateOff,
    modalOff,
    popupAnimateOff,
    popupOff,
    searchAnimateOff,
    searchOff,
    useAppDispatch, 
    useAppSelector 
} from "@/lib";

export const Modal = () => {
    const dispatch = useAppDispatch();
    const modal = useAppSelector( ( state ) => state.modal.value );
    const modalAnimation = useAppSelector( ( state ) => state.modal.modalAnimation );

    const handleModal = () => {
        dispatch( modalAnimateOff() );
        dispatch( menuAnimateOff() );
        dispatch( cartAnimateOff() );
        dispatch( searchAnimateOff() );
        dispatch( popupAnimateOff() );
        new Promise( ( resolve ) => setTimeout( resolve, 300 ) ).then( () => {
            dispatch( modalOff() );
            dispatch( menuOff() );
            dispatch( cartOff() );
            dispatch( searchOff() );
            dispatch( popupOff() );
        } );
    };

    return (
        <div
            aria-hidden={modal ? "false" : "true"}
            onClick={handleModal}
            role="dialog"
            className={cn(
                "absolute h-screen w-full bg-neutral-950/35 transition duration-300 ease-in-out",
                { "-z-20 h-screen opacity-0": !modal },
                {
                    "z-30 h-full": modal,
                },
                {
                    "z-40 h-[2000px] opacity-100 shadow-[0_35px_2000px_200px_rgba(0,0,0,0.3)]":
            modalAnimation,
                },
                { "opacity-0 duration-300": !modalAnimation },
            )}
        ></div>
    );
};
