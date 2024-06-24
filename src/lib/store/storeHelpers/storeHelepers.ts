'use client'

import { Action } from '@reduxjs/toolkit';

import { scrollToTop } from '@/config/helpers';

import { modalAnimateOff, modalAnimateOn, modalOff, modalOn } from "../slices/modalSlice";
import { AppDispatch } from "../store";

/**
 * Turn on store modal with animation
 * @param dispatch Redux dispatch
 * @array dispathReducers Redux reducers 
 */
export const turnModalOn =  (dispatch: AppDispatch , dispathReducers?: Array<() => Action>) => {
    if (dispathReducers) {
        dispathReducers.forEach(func => dispatch(func()));
    }
    dispatch(modalOn());
    dispatch(modalAnimateOn());
    scrollToTop()
}

/**
 * Turn off store modal with animation
 * @param dispatch Redux dispatch
 * @array dispathReducers Redux reducers before animation
 * @array dispathReducersAfterAnimations Redux reducer after animations ends
 */
export const turnModalOff = (dispatch: AppDispatch, dispathReducers?: Array<() => Action>, dispathReducersAfterAnimations?: Array<() => Action>) => {
    dispatch(modalAnimateOff());
    if (dispathReducers) {
        dispathReducers.forEach(func => dispatch(func()));
    }
    new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
      dispatch(modalOff());
      if (dispathReducersAfterAnimations) {
        dispathReducersAfterAnimations.forEach(func => dispatch(func()));
      }
    });
}