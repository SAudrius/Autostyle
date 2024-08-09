'use client'

import { Action } from '@reduxjs/toolkit';

import { scrollToTop } from '@/config/helpers';

import { modalAnimateOff, modalAnimateOn, modalOff, modalOn } from "../slices/modalSlice";
import { popupAnimateOff, popupAnimateOn, popupOff, popupOn, popupSetElementKey } from '../slices/popupSlice';
import { AppDispatch } from "../store";

/**
 * Turn on store modal with animation
 * @param dispatch Redux dispatch function
 * @param dispatchReducers Array of functions that dispatch Redux actions
 * @param delay Delay in milliseconds before executing actions (default: 0)
 */
export const turnModalOn =  ( dispatch: AppDispatch, dispatchReducers?: Array<() => Action>, delay: number = 0 ) => {
    scrollToTop()

    setTimeout( () => {
        if ( dispatchReducers ) {
            dispatchReducers.forEach( func => dispatch( func() ) );
        }
        dispatch( modalOn() );
        dispatch( modalAnimateOn() );
    }, delay );
}

/**
 * Turn off store modal with animation
 * @param dispatch Redux dispatch
 * @param dispatchReducers Array of functions that dispatch Redux actions
 * @param dispatchReducersAfterAnimations Array of functions that dispatch Redux after animations
 */
export const turnModalOff = ( dispatch: AppDispatch, dispatchReducers?: Array<() => Action>, dispatchReducersAfterAnimations?: Array<() => Action> ) => {
    dispatch( modalAnimateOff() );
    if ( dispatchReducers ) {
        dispatchReducers.forEach( func => dispatch( func() ) );
    }
    new Promise( ( resolve ) => setTimeout( resolve, 300 ) ).then( () => {
        dispatch( modalOff() );
        if ( dispatchReducersAfterAnimations ) {
            dispatchReducersAfterAnimations.forEach( func => dispatch( func() ) );
        }
    } );
}

/**
 * Turn on store popup and modal with animation
 * @param dispatch Redux dispatch function
 * @param reactElement Element of popup that is displayed
 * @param delay Delay in milliseconds before executing actions (default: 0)
 */
export const turnPopupAndModalOn =  ( dispatch: AppDispatch, elementKey: string, delay: number = 0 ) => {
    scrollToTop()

    setTimeout( () => {
        dispatch( popupSetElementKey( elementKey ) )
        dispatch( modalOn() );
        dispatch( popupOn() );
        dispatch( modalAnimateOn() );
        dispatch( popupAnimateOn() );
    }, delay );
}

/**
 * Turn off store popup and modal with animation
 * @param dispatch Redux dispatch
 * @param dispatchReducers Array of functions that dispatch Redux actions
 * @param dispatchReducersAfterAnimations Array of functions that dispatch Redux after animations
 */
export const turnPopupAndModalOff = ( dispatch: AppDispatch, dispatchReducers?: Array<() => Action>, dispatchReducersAfterAnimations?: Array<() => Action> ) => {
    dispatch( modalAnimateOff() );
    dispatch( popupAnimateOff() );

    if ( dispatchReducers ) {
        dispatchReducers.forEach( func => dispatch( func() ) );
    }
    new Promise( ( resolve ) => setTimeout( resolve, 300 ) ).then( () => {
        dispatch( modalOff() );
        dispatch( popupOff() );

        if ( dispatchReducersAfterAnimations ) {
            dispatchReducersAfterAnimations.forEach( func => dispatch( func() ) );
        }
    } );
}