import React from "react";

import { SectionExplore } from "./SectionExplore";
import { SectionLogo } from "./SectionLogo";
import { SectionResources } from "./SectionResources";

export const Footer = () => {
    return (
        <footer className="bg-neutral-800">
            <div className="container pb-24 pt-12 text-white md:pt-20 lg:flex lg:flex-row lg:justify-between lg:gap-16">
                <div className="grid max-w-[375px] gap-y-8 md:max-w-none md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    <SectionLogo />
                    <div className="col-span-2 grid grid-rows-none gap-x-6 gap-y-8 md:grid-cols-2 md:gap-x-8">
                        <SectionExplore />
                        <SectionResources />
                    </div>
                </div>
            </div>
        </footer>
    );
};
