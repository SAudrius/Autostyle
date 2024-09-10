import React from 'react'

export const SingleProductCardSmallLoadingSkeleton = () => {
    return (
        <div className={'grid sm:grid-cols-2 gap-4'}>
            <div className='h-28 w-full bg-neutral-300 rounded'>
                {/* <img src="" alt="" /> */}
            </div>
            <div className='flex flex-col mt-1'>
                <p className={'font-semibold text-base leading-5 bg-neutral-800 rounded h-5'}></p>
                <div className='mt-1 grid grid-cols-4 gap-2'>
                    <p className='uppercase tracking-wide-8 text-[12px] rounded h-4 bg-neutral-300 col-span-2'></p>
                    <p className='uppercase tracking-wide-8 text-[12px] rounded h-4 bg-neutral-300 col-span-2'></p>
                    <p className='uppercase tracking-wide-8 text-[12px] rounded h-4 bg-neutral-300 col-span-3'></p>
                </div>
                <div className='flex gap-3'>
                    <div className="mt-2 relative">
                        <p className={ 'text-base leading-5 text-neutral-500 bg-neutral-800 h-5 w-[80px] rounded mt-2'}></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
