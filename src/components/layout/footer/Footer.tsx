
import React from "react";

import { SectionExplore } from './SectionExplore';
import { SectionLogo } from './SectionLogo';
import { SectionResources } from './SectionResources';

export const Footer = () => {
  return  <div className="bg-neutral-800"> 
  <div className="container pt-12 pb-24 text-white md:pt-20 lg:flex lg:flex-row lg:justify-between lg:gap-16">
        <SectionLogo/>
         <div className="md:flex md:flex-row md:gap-8">
        <SectionExplore/> 
        <SectionResources/>
        </div>
  </div>
  </div>
};
