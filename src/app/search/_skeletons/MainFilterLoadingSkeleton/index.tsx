import React from 'react'

export const MainFilterLoadingSkeleton = () => {
    return (
        <div className='bg-neutral-800 mt-8'>
            <div className={'bg-neutral-800 pt-4 px-4 rounded grid gap-4'}>
                <div className='w-[290px] z-10'>
                    <div className='bg-white w-full h-9 flex items-center'>
                        <div className='bg-neutral-800 mx-4 my-3 h-4 w-[200px] rounded animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-20% to--neutral-800 bg-[length:200%_100%]'></div>
                    </div>
                </div>
            </div>
            <div className={'bg-neutral-800 pt-4 px-4  rounded grid gap-4'}>
                <div className='w-[290px] z-10'>
                    <div className='bg-white w-full h-9 flex items-center'>
                        <div className='bg-neutral-800 mx-4 my-3 h-4 w-[200px] rounded animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-20% to--neutral-800 bg-[length:200%_100%]'></div>
                    </div>
                </div>
            </div>
            <div className={'bg-neutral-800 pt-4 px-4 pb-4 rounded grid gap-4'}>
                <div className='w-[290px] z-10'>
                    <div className='bg-white w-full h-9 flex items-center'>
                        <div className='bg-neutral-800 mx-4 my-3 h-4 w-[200px] rounded animate-loading bg-gradient-to-l from-neutral-800  via-neutral-600 via-20% to--neutral-800 bg-[length:200%_100%]'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
