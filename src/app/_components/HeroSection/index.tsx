"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useRef, useState } from "react";
import Slider, { Settings } from "react-slick";

import { HeroSlide } from "../HeroSlide";

export const HeroSection = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [ currentSlide, setCurrentSlide ] = useState<number>( 0 )
    const sliderRef = useRef<Slider | null>( null );
    const intervalRef = useRef<NodeJS.Timeout | null>( null ); 

    const settings: Settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        afterChange: ( current: number ) => {
            setCurrentSlide( current );
            resetInterval();
        },
    };

    const changeSlide = () => {
        setCurrentSlide( ( prevSlide ) => {
            const nextIndex = ( prevSlide + 1 )

            sliderRef.current?.slickGoTo( nextIndex );
            return nextIndex;
        } );
    };

    const resetInterval = () => {
        if ( intervalRef.current ) {
            clearInterval( intervalRef.current );
        }
        intervalRef.current = setInterval( () => {
            changeSlide();
        }, 15000 ); 
    };


    useEffect( () => {
        if ( sliderRef.current ) {
            resetInterval();
            
            return () => {
                if ( intervalRef.current ) {
                    clearInterval( intervalRef.current );
                }
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ ] );


    return ( 
        <Slider {...settings} ref={sliderRef} className="overflow-hidden">
            <HeroSlide featureMessage="NEW MOLDINGS" brand="Mercedes-Benz" hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/mercedes-hero.png')]"/>
            <HeroSlide featureMessage="NEW MOLDINGS" brand="Audi" hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/audi-hero.png')]" />
            <HeroSlide featureMessage="NEW MOLDINGS" brand="Volkswagen" hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/volkswagen-hero.png')]"/>
            <HeroSlide featureMessage="NEW MOLDINGS" brand="Mercedes-Benz" hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/mercedes-hero.png')]"/>
            <HeroSlide featureMessage="NEW MOLDINGS" brand="Volkswagen" hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/audi-hero.png')]" />
            <HeroSlide featureMessage="NEW MOLDINGS" brand="Audi" hasButton imgClass="bg-[url('https://Autostyle.b-cdn.net/volkswagen-hero.png')]"/>
        </Slider>
    );
}