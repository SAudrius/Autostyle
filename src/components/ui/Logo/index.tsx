import Image from "next/image";
import Link from "next/link";
import React from "react";

import footerAutoplateImg from "/public/assets/images/footer-logo.png";
import autoplateImg from "/public/assets/images/header-logo.png";

interface LogoProps {
  footer?: boolean;
}

export const Logo = ( { footer }: LogoProps ) => {
    if ( footer ) {
        return (
            <Link href="/" className="cursor-pointer">
                <Image
                    src={footerAutoplateImg}
                    alt="Autoplate logo"
                    width={200}
                    height={37}
                />
            </Link>
        );
    }
    return (
        <Link href="/" className="cursor-pointer">
            <Image src={autoplateImg} alt="Autoplate logo" width={174} height={31} />
        </Link>
    );
};
