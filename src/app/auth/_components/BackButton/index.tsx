import React from "react";

interface BackButtonProps {
  children: React.ReactNode;
  link: string;
}

export const BackButton = ( { link, children }: BackButtonProps ) => {
    return (
        <a className="inline-block cursor-pointer text-center text-sm" href={link}>
            {children}
        </a>
    );
};
