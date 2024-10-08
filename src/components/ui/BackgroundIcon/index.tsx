import React from 'react'

import { cn } from '@/config'

interface BackgroundIconProps {
    className?:string
}

export const BackgroundIcon = ( { className }:BackgroundIconProps ) => {
    return (
        <svg className={cn( className )} width="1409" height="1409" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="1409" height="1409">
                <circle cx="704.682" cy="704.682" r="703" fill="#fff" stroke="#000" strokeWidth="2"/>
            </mask>
            <g mask="url(#a)">
                <path d="M602.277 218.778 686.803-.693l35.571-.417 59.697 143.571L1245.26 1233.66l-179.8 76.32L602.277 218.778Z" fill="url(#b)"/>
                <path d="M623.223 145.804 686.795-.692l-84.113 219.374 101 235-361.704 854.578-179.794-76.32L623.223 145.804Z" fill="url(#c)"/>
                <path d="m946.158 25.54 55.522 15.017 83.87 37.125 82.5 49.5 83.88 68.75 52.25 59.125 48.12 64.625 39.88 70.125 17.87 41.251 17.88 46.75 13.75 42.624 12.37 60.5 11 71.5 1.38 57.751-5.5 72.874-9.63 68.75-19.25 68.75-27.5 71.5-26.13 51.823L946.158 25.54Z" fill="url(#d)"/>
                <path d="m703.307 1067.68 144.375 343.75h-286l141.625-343.75Z" fill="url(#e)"/>
                <path d="m.681 428.306 5.5-13.75 13.24-28.161 17.809-34.22 31.524-50.637 34.286-42.414 35.661-41.041 37.044-35.56 45.283-39.657 46.667-32.804L328.1 75.909l57.671-25.938 45.319-16.368 31.461-7.813L31.353 1041.63l-12.797-20.7-23.374-50.874-17.875-50.875-12.375-44-13.75-63.25-6.875-72.875v-71.5l5.5-66 15.125-71.5 19.25-59.125 9.624-27.5L.68 428.306Z" fill="url(#f)"/>
            </g><defs><linearGradient id="b" x1="696.682" y1="-47.318" x2="686.682" y2="1720.68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7DFFFF" stopOpacity=".02"/><stop offset="1" stopColor="#4BCCD2" stopOpacity=".15"/>
            </linearGradient><linearGradient id="c" x1="710.682" y1="-1.318" x2="714.682" y2="1723.68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7DFFFF" stopOpacity=".02"/><stop offset="1" stopColor="#4BCCD2" stopOpacity=".05"/>
            </linearGradient><linearGradient id="d" x1="686.682" y1="-36.318" x2="717.682" y2="1417.68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7DFFFF" stopOpacity=".02"/><stop offset="1" stopColor="#4BCCD2" stopOpacity=".15"/>
            </linearGradient><linearGradient id="e" x1="704.682" y1="-9.318" x2="704.682" y2="1723.68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7DFFFF" stopOpacity=".02"/><stop offset="1" stopColor="#4BCCD2" stopOpacity=".05"/>
            </linearGradient><linearGradient id="f" x1="683.682" y1="-2.318" x2="700.682" y2="1730.68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7DFFFF" stopOpacity="0"/><stop offset="1" stopColor="#4BCCD2" stopOpacity=".15"/>
            </linearGradient></defs>
        </svg>
    )
}
