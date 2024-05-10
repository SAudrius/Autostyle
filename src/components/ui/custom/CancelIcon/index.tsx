"use client";
import React from "react";

interface CancelIconProps {
  onClick: () => void;
  className?: string;
  light?: boolean;
}
const DARK = "#161C1D";
const LIGHT = "#ffffff";

export const CancelIcon = ({ onClick, className, light }: CancelIconProps) => {
  return (
    <div onClick={onClick} className={className}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="1.49738"
          height="23.9581"
          rx="0.748691"
          transform="matrix(0.707101 -0.707112 0.707101 0.707112 0 1.05859)"
          fill={light ? DARK : LIGHT}
        />
        <rect
          width="1.49738"
          height="23.9581"
          rx="0.748691"
          transform="matrix(0.707101 0.707112 -0.707101 0.707112 16.9414 0)"
          fill={light ? DARK : LIGHT}
        />
      </svg>
    </div>
  );
};
