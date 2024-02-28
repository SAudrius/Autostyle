import Image from 'next/image';
import Link from 'next/link';
import React from "react";

import { montserrat, nunito } from '@/config/fonts';
import { cn } from '@/config/utils';

export const Footer = () => {
  return  <div className="bg-neutral-800"> 
  <div className="container pt-12 pb-24 text-white md:pt-20 lg:flex lg:flex-row lg:justify-between lg:gap-16">
    <div>
      <Image
        src="/assets/images/footer.png"
        alt="footer image"
        width={200}
        height={37.34}
      />
      <p className={cn("mt-4 text-sm max-w-sm", nunito.className)}>We specialize in providing a wide range of car styling accessories & components.
         Discover how we can enhance your vehicles aesthetics and functionality.</p>
         </div>
         <div className="md:flex md:flex-row md:gap-8">
         <div className="flex flex-col gap-6 mt-8 ">
          <p className={cn("uppercase font-medium tracking-widest", montserrat.className)}>explore</p>
          <div className={cn("flex flex-row gap-8 font-light text-sm", nunito.className)}>
            <Link className="w-40" href="#">Search</Link>
            <Link className="w-40" href="#">Brands</Link>
          </div>
         </div>
         <div className="flex flex-col gap-6 mt-8 ">
          <p className={cn("uppercase font-medium tracking-widest", montserrat.className)}>resources</p>
          <div className=' justify-between font-light text-sm tracking-wide'>
          <div className={cn("flex flex-row gap-8", nunito.className)}>
            <Link className="w-40" href="#">Shipping Information</Link>
            <Link className="w-40" href="#">Returns & Exchanges</Link>
          </div>
          <div className={cn("flex flex-row mt-4 gap-8", nunito.className)}>
            <Link className="w-40" href="#">Privacy Policy</Link>
            <Link className="w-40" href="#">Terms of Use</Link>
          </div>
          <div className={cn("flex flex-row mt-4 gap-8", nunito.className)}>
            <Link className="w-40" href="#">Copyright Policy</Link>
            <Link className="w-40" href="#">Conditions of Sale</Link>
          </div>
          <div className={cn("flex flex-row mt-4 gap-8", nunito.className)}>
            <Link className="w-40" href="#">Need Help?</Link>
            <Link className="w-40" href="#">Contact Us</Link>
          </div>
          </div>
          </div>
         </div>
  </div>
  </div>
};
